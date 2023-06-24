import {Component, OnInit, ViewChild} from '@angular/core';
import {Singer} from "../../../model/Singer";
import {ActivatedRoute} from "@angular/router";
import {SingerService} from "../../../service/singer.service";
import {UpdateCategoryComponent} from "../../category/update-category/update-category.component";
import {MatDialog} from "@angular/material/dialog";
import {TokenService} from "../../../service/token.service";
import {UpdateSingerComponent} from "../update-singer/update-singer.component";
import {MatTableDataSource} from "@angular/material/table";
import {Category} from "../../../model/Category";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-detail-singer',
  templateUrl: './detail-singer.component.html',
  styleUrls: ['./detail-singer.component.css']
})
export class DetailSingerComponent implements OnInit{
  singer?: Singer;
  checkUserAdmin= false;
  dataSource: any;
  constructor(private act:ActivatedRoute,
              public dialog: MatDialog,
              private singerService:SingerService,
              private tokenService: TokenService,) {
  }
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      console.log('role ---->', this.tokenService.getRole())
      if (JSON.stringify(this.tokenService.getRole()) == JSON.stringify(['ADMIN'])) {
        this.checkUserAdmin = true;
      }
      //  console.log('role -->', this.tokenService.getRole())
      // if(JSON.stringify(this.tokenService.getRole())==JSON.stringify(['ADMIN'])){
      //   this.checkUserAdmin = true;
      // }
      // this.checkUserLogin = true;
    }
    this.act.paramMap.subscribe(singerId =>{
      // @ts-ignore
      const id = +singerId.get('id');
      console.log("id singer" , singerId)
      this.singerService.findSingerById(id).subscribe(data =>{
        this.singer = data;
        console.log('this.singer', this.singer)
      })
    })
  }

  openDialogUpdate(id: any) {
    const dialogRef = this.dialog.open(UpdateSingerComponent, {
      data: {
        dataKey: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result || result == undefined) {
        this.singerService.getListSingerService().subscribe(data => {
          this.singer = data;

          // @ts-ignore
          this.dataSource = new MatTableDataSource<Singer>(this.singer);

          this.dataSource.paginator = this.paginator;
        })
      }
    });
  }
}
