import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  getImages(params: string, imagesPerPage: number, actualPage: number): Observable<any> {
    const URL = environment.pixabay_url + '?q=' + params +
                 '&images_per_page=' + imagesPerPage + '&page=' + actualPage;
    return this.http.get(URL);
  }

}
