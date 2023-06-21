import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Song} from "../model/Song";

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private API_SONG = environment.API_SERVER + 'song';
  // private API_SONG = environment.API_LOCAL + 'song';

  constructor(private httpClient: HttpClient) {
  }

  getPageSong(request: any): Observable<any> {
    const params = request;
    return this.httpClient.get(this.API_SONG + '/page', {params})
  }

  createSong(song: Song): Observable<any> {
    return this.httpClient.post(this.API_SONG, song);
  }
}
