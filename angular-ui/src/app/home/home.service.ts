import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private REST_API_SERVER_PERSON = "https://localhost:7213/Person";
  private REST_API_SERVER_SEASON = "https://localhost:7213/Season";

  constructor(private httpClient: HttpClient) { }

  public getInformation(): Observable<any> {
    return this.httpClient.get(this.REST_API_SERVER_PERSON);
  }

  public getSeasons(): Observable<any> {
    return this.httpClient.get(this.REST_API_SERVER_SEASON);
  }
}
