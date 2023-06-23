import {Component, OnInit} from '@angular/core';
import {Singer} from "../../../model/Singer";
import {ActivatedRoute} from "@angular/router";
import {SingerService} from "../../../service/singer.service";

@Component({
  selector: 'app-detail-singer',
  templateUrl: './detail-singer.component.html',
  styleUrls: ['./detail-singer.component.css']
})
export class DetailSingerComponent implements OnInit{
  singer?: Singer;
  constructor(private act:ActivatedRoute,
              private singerService:SingerService) {
  }

  ngOnInit(): void {
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

}
