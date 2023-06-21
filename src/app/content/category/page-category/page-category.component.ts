import {Component, OnInit, ViewChild} from '@angular/core';
import {Category} from "../../../model/Category";
import {CategoryService} from "../../../service/category.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {CreateCategoryComponent} from "../create-category/create-category.component";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-page-category',
  templateUrl: './page-category.component.html',
  styleUrls: ['./page-category.component.css']
})
export class PageCategoryComponent implements OnInit{
  listCategory?:Category[];
  totalElements:number = 0;
  dataSource: any;

  constructor(private categoryService: CategoryService,
              public dialog:MatDialog) {
  }

  getPageRequest(request: any){
    this.categoryService.getPageCategory(request).subscribe(data=>{
      console.log('data -->', data)
      this.listCategory = data['content'];
      console.log('content --->', this.listCategory)
      this.totalElements = data['totalElements'];
      console.log('total --->', this.totalElements)
    })
  }
  ngOnInit(): void {
    const request = {page:0,size:5}
    this.getPageRequest(request);
  }

  nextPage($event:PageEvent){
    const request={};
    // @ts-ignore
    request['page'] = $event.pageIndex.toString();
    // @ts-ignore
    request['size'] = $event.pageSize.toString();
    this.getPageRequest(request);
  }
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  openDialogCreate() {
    const dialogRef=this.dialog.open(CreateCategoryComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result||result==undefined){
        this.categoryService.getListCategoryService().subscribe(data =>{
          this.listCategory = data;
          this.dataSource = new MatTableDataSource<Category>(this.listCategory);
          this.dataSource.paginator = this.paginator;
        })
      }
    })
  }
}
