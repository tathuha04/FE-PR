import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Singer} from "../../../model/Singer";
import {SingerService} from "../../../service/singer.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateSingerComponent} from "../create-singer/create-singer.component";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-page-singer',
  templateUrl: './page-singer.component.html',
  styleUrls: ['./page-singer.component.css']
})
export class PageSingerComponent implements OnInit{
  singerList?: Singer[];
  totalElements: number=0;
  dataSource : any;

  constructor(private singerService: SingerService,
              public dialog:MatDialog) {
  }

  getPageRequest(request:any){
    this.singerService.getPageSinger(request).subscribe(data =>{
      this.singerList = data['content'];
      this.totalElements = data['totalElements']
    })
  }

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  openDialogCreate() {
    const dialogRef = this.dialog.open(CreateSingerComponent)
    dialogRef.afterClosed().subscribe(result =>{
      if (result||result == undefined){
        this.singerService.getListSingerService().subscribe(data =>{
          this.singerList = data;
          this.dataSource = new MatTableDataSource<Singer>(this.singerList);
          this.dataSource.paginator = this.paginator;
        })
      }
    })
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
    const request = {page:0,size:5}
    this.getPageRequest(request);
  }
}
