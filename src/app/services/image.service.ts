import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private error$ = new Subject<string>();
  private searchTerm$ = new Subject<string>();


  constructor(private http: HttpClient) { }

  setError(message: string) {
    this.error$.next(message);
  }

  getError(): Observable<string> {
    return this.error$.asObservable();
  }
  sendSearchTerm(term: string) {
    this.searchTerm$.next(term);
  }

  getSearchTerm(): Observable<string> {
    return this.searchTerm$.asObservable();
  }

  getImages(term: string, imagesPerPage: number, actualPage: number): Observable<any> {
    const KEY = '21502932-3b6127706a242061ed283fa4e';
    const URL = 'https://pixabay.com/api/?key=' + KEY + '&q=' + term +
                 '&per_page=' + imagesPerPage + '&page=' + actualPage;
    return this.http.get(URL);
  }

}
