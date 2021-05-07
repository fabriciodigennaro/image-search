import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-list-image',
  templateUrl: './list-image.component.html',
  styleUrls: ['./list-image.component.css']
})
export class ListImageComponent implements OnInit {
  term = '';
  subscription: Subscription;
  listImages: any[] = [];
  loading = false;
  imagePerPage = 30;
  actualPage= 1;
  calculateTotalPages = 0;


  constructor(private _imageService: ImageService) { 
    this.subscription = this._imageService.getSearchTerm().subscribe(data => {
      this.term = data;
      this.actualPage = 1;
      this.loading = true;
      this.getImage();
    })
  }

  ngOnInit(): void {
  }

  getImage() {
    this._imageService.getImages(this.term, this.imagePerPage, this.actualPage).subscribe(data => {
      this.loading = false;

      if(data.hits.length === 0) {
        this._imageService.setError('Opss... no encontramos ningun resultado');
        return;
      } 
      this.calculateTotalPages = Math.ceil(data.totalHits / this.imagePerPage);

      this.listImages = data.hits;      
    }, error => {
      this._imageService.setError('Opss... ocurrio un error');
      this.loading = false;
    })
  }

  previousPage() {
    this.actualPage--;
    this.loading = true;
    this.listImages = [];
    this.getImage();
  }

  nextPage() {
    this.actualPage++;
    this.loading = true;
    this.listImages = [];
    this.getImage();
  }

  previousPageClass() {
    if(this.actualPage === 1) {
      return false;
    }
    return true;
  }

  nextPageClass() {
    if(this.actualPage === this.calculateTotalPages) {
      return false;
    }
    return true;
  }

}
