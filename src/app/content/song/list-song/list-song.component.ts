import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {TokenService} from "../../../service/token.service";
import {PlaylistService} from "../../../service/playlist.service";
import {Playlist} from "../../../model/Playlist";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {SongService} from "../../../service/song.service";
import {Song} from "../../../model/Song";
import {PlaylistDTO} from "../../../model/PlaylistDTO";

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.css']
})
export class ListSongComponent {
   checkUserAdmin = false;
   playlistDTO ?: PlaylistDTO;

  constructor(private dialog: MatDialog,
              private tokenService: TokenService,
              private songService: SongService,
              @Inject(MAT_DIALOG_DATA)
              public data:any,
              private playService: PlaylistService){}


  listSong: Song[] = [];
  displayedColumns: string[] = ['id', 'name', 'avatar','add'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      console.log('role ---->', this.tokenService.getRole())
      if(JSON.stringify(this.tokenService.getRole())== JSON.stringify(['ADMIN'])){
        this.checkUserAdmin = true;
      }

    }
    this.songService.getListSongService().subscribe(data =>{
      this.listSong = data;
      this.dataSource = new MatTableDataSource<Song>(this.listSong);
      this.dataSource.paginator = this.paginator;
    })
  }

  addSong(id : any) {
    console.log(id , "id songgggg");
    this.playlistDTO = new PlaylistDTO(
      this.data.dataKey,
      id
    )
    console.log(this.playlistDTO , "playlistDTO")
    this.playService.addSong(this.playlistDTO).subscribe(data=>{
      if (data.message == "create_success"){
        console.log("create thanh cong")
      }
    })

  }
}
