import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SongService} from "../../../service/song.service";
import {Song} from "../../../model/Song";

@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.css']
})
export class DetailSongComponent implements OnInit {
  song?: Song;

  constructor(private act: ActivatedRoute,
              private songService: SongService) {
  }

  ngOnInit(): void {
    this.act.paramMap.subscribe(songId => {
      // @ts-ignore
      const id = +songId.get('id');
      console.log("id", id)
      this.songService.findSongById(id).subscribe(data => {
        this.song = data;
        console.log(data)
        console.log("this.song    ---->",this.song);
      })
    })

  }


}
