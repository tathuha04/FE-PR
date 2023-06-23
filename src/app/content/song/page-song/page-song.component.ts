import {Component, OnInit, ViewChild} from '@angular/core';
import {single} from "rxjs";
import {SingerService} from "../../../service/singer.service";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {CreateSingerComponent} from "../../singer/create-singer/create-singer.component";
import {MatTableDataSource} from "@angular/material/table";
import {SongService} from "../../../service/song.service";
import {Song} from "../../../model/Song";
import {CreateSongComponent} from "../create-song/create-song.component";

@Component({
  selector: 'app-page-song',
  templateUrl: './page-song.component.html',
  styleUrls: ['./page-song.component.css']
})
export class PageSongComponent implements OnInit{
  listSong?: Song[];

  totalElements: number=0;
  dataSource : any;

  constructor(private songService: SongService,
              public dialog:MatDialog) {
  }

  getPageRequest(request:any){
    this.songService.getPageSong(request).subscribe(data =>{
      console.log("song---->",data)
      this.listSong = data['content'];
      console.log("song list",this.listSong)
      this.totalElements = data['totalElements']
    })
  }

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  openDialogCreate() {
    const dialogRef = this.dialog.open(CreateSongComponent);

    dialogRef.afterClosed().subscribe(result => {

      if(result||result==undefined){

      }
    });
  }


  nextPage($event: PageEvent) {
    const request={};
    // @ts-ignore
    request['page'] = $event.pageIndex.toString();
    // @ts-ignore
    request['size'] = $event.pageSize.toString();
    this.getPageRequest(request);
  }

  ngOnInit(): void {
    const request = {page:0,size:6}
    this.getPageRequest(request);
  }
}
