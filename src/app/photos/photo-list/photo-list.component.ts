import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PhotoService } from './../photo/photo.service';
import { Photo } from '../photo/photo';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = '';
  hasMore: boolean = false;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoSevice: PhotoService
  ) {}

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params['userName'];
    this.photos = this.activatedRoute.snapshot.data['photos'];
  }

  load() {
    this.photoSevice
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
        if(!photos.length) {
          this.hasMore = false;
        }
      })
  }
}
