import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Activity } from '../types/activity.class';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class BoredService {

  API_URL = "https://www.boredapi.com/api/";

  constructor(
    private httpClient: HttpClient,
  ) { }

  getActivity(type: string): Observable<Activity> {
    return this.httpClient
      .get<Activity>(`${this.API_URL}activity?type=${type}`);
  }
}
