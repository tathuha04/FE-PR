import {Component, OnInit, ViewChild} from '@angular/core';
import {SongService} from "../../service/song.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Song} from "../../model/Song";

@Component({
  selector: 'app-page-search',
  templateUrl: './page-search.component.html',
  styleUrls: ['./page-search.component.css']
})
export class PageSearchComponent {
  search?: string;
  listSong?: Song[];

  totalElements: number = 0;

  constructor(private songService: SongService) {
    this.songService.getValue().subscribe(data => {
      this.search = data
      console.log("search page ", this.search)
      if (this.search == '') {
        this.listSong = [];
        return;
      }

      const request = {page: 0, size: 6}
      this.getPageRequest(request, this.search);
    })

  }


  @ViewChild(MatPaginator) paginator?: MatPaginator;

  getPageRequest(request: any, search: string) {
    this.songService.getPageSearchSong(request, search).subscribe(data => {
      console.log("song---->", data)
      this.listSong = data['content'];
      console.log("song list", this.listSong)
      this.totalElements = data['totalElements']
    })
  }

  nextPage($event: PageEvent) {
    const request = {};
    // @ts-ignore
    request['page'] = $event.pageIndex.toString();
    // @ts-ignore
    request['size'] = $event.pageSize.toString();
    // @ts-ignore
    this.getPageRequest(request, this.search);
  }


}
