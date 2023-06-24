import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlaylistService} from "../../../service/playlist.service";
import {Playlist} from "../../../model/Playlist";
import {CreateCategoryComponent} from "../../category/create-category/create-category.component";
import {MatTableDataSource} from "@angular/material/table";
import {Category} from "../../../model/Category";
import {MatDialog} from "@angular/material/dialog";
import {ListSongComponent} from "../../song/list-song/list-song.component";
import {Song} from "../../../model/Song";

@Component({
  selector: 'app-detail-playlist',
  templateUrl: './detail-playlist.component.html',
  styleUrls: ['./detail-playlist.component.css']
})
export class DetailPlaylistComponent implements OnInit {
  playlist?: Playlist;
//
//   constructor(private act: ActivatedRoute,
//               private playlistService: PlaylistService) {
//   }
//
//   ngOnInit(): void {
//     this.act.paramMap.subscribe(playlistId => {
//       // @ts-ignore
//       const id = +playlistId.get('id');
//       console.log("id", id)
//       this.playlistService.findPlaylistById(id).subscribe(data => {
//         this.playlist = data;
//         console.log(data)
//         console.log("this.playlist    ---->",this.playlist);
//       })
//     })
//
//   }
//
//
// }

// import {Component, OnInit} from '@angular/core';
//
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit{
  constructor(private dialog: MatDialog,
              private act: ActivatedRoute,
              private playlistService: PlaylistService) {
  }

  previous: any;
  play: any;
  next: any;
  title: any;
  recent_volume: any;
  volume_show: any;
  slider: any;
  show_duration: any;
  track_image: any;
  auto_play: any;
  present: any;
  total: any;
  artist: any;
  volume_icon: any;

  timer?: number;

  autoplay = false;


  index_no: number = 0;

  playingSong = false;

//create a audio Element

  track: any;
  All_song = [
    {
      name: "first song",
      path: "https://firebasestorage.googleapis.com/v0/b/chinhcomhut-cff0e.appspot.com/o/Sneaky-Snitch.mp3?alt=media&token=d69403c6-efd4-45d5-be54-1a071fe4d9d7",
      img: "https://firebasestorage.googleapis.com/v0/b/chinhcomhut-cff0e.appspot.com/o/luffy1.jpg?alt=media&token=20f255c5-f4c7-4dad-a1fb-df78a2e079d0",
      singer: "1"
    }
    ,
    {
      name: "second song",
      path: "https://firebasestorage.googleapis.com/v0/b/chinhcomhut-cff0e.appspot.com/o/Am-thanh-u-hu-www_tiengdong_com.mp3?alt=media&token=69a26b53-8ede-4477-9f4c-89756ba4ea4e",
      img: "https://firebasestorage.googleapis.com/v0/b/chinhcomhut-cff0e.appspot.com/o/Nami.webp?alt=media&token=b5787064-d6b9-4a74-8716-8b699026817c",
      singer: "2"
    },
    {
      name: "Three Song",
      path: "https://firebasestorage.googleapis.com/v0/b/chinhcomhut-cff0e.appspot.com/o/Sneaky-Snitch.mp3?alt=media&token=d69403c6-efd4-45d5-be54-1a071fe4d9d7",
      img: "https://firebasestorage.googleapis.com/v0/b/chinhcomhut-cff0e.appspot.com/o/luffy1.jpg?alt=media&token=20f255c5-f4c7-4dad-a1fb-df78a2e079d0",
      singer: "1"
    }
  ];

  reset_slider() {
    // @ts-ignore
    // this.slider.value = 0;
  }


  idPlaylist: number = 0;

  ngOnInit(): void {
    this.act.paramMap.subscribe(playlistId => {
      // @ts-ignore
      this.idPlaylist = +playlistId.get('id');

      this.playlistService.findPlaylistById(this.idPlaylist).subscribe(data => {
        this.playlist = data;
        console.log(data)
        console.log("this.playlist    ---->", this.playlist);
        this.playlistService.getListSongFromPlaylist(this.idPlaylist).subscribe(data=>{
          this.listSong = data;
          console.log(this.listSong , "list Song")
        })
      })

    })


    this.timer = 0;
    this.previous = document.querySelector('#pre');
    this.play = document.querySelector('#play');
    this.next = document.querySelector('#next');
    this.title = document.getElementById('title');
    this.recent_volume = document.querySelector('#volume');
    this.volume_show = document.querySelector('#volume_show');
    this.volume_icon = document.getElementById('volume_icon');
    this.slider = document.getElementById('duration_slider');
    this.show_duration = document.querySelector('#show_duration');
    this.track_image = document.querySelector('#track_image');
    this.auto_play = document.querySelector('#auto');
    this.present = document.querySelector('#present');
    this.total = document.querySelector('#total');
    this.artist = document.querySelector('#artist');
    this.track = document.createElement('audio');
    this.timer = 0;
    // this.autoplay = false;
    this.index_no = 0;
    this.load_track(this.index_no)
  }

  load_track(index_no: any) {
    console.log('index_no ---->', index_no)
    if (this.timer) {
      clearInterval(this.timer);
    }
    // clearInterval(this.timer);
    this.resetSlider();

    // this.track.src = this.listSong[index_no].url;
    // this.title.innerHTML = this.listSong[index_no].name;
    // this.track_image.src = this.listSong[index_no].avatar;
    // this.artist.innerHTML = this.listSong[index_no].singerList;
    this.track.load();


    // this.timer = setInterval(this.range_slider, 1000);
    // @ts-ignore
    this.timer = setInterval(() => {
      this.range_slider();
    }, 1000);
    this.total.innerHTML = this.listSong.length;
    this.present.innerHTML = index_no + 1;
  }


  playSong() {
    this.track.play();
    this.playingSong = true;
    // @ts-ignore
    this.play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
  }

  justPlay() {
    if (!this.playingSong) {
      this.playSong();
      // this.play.className = 'bi bi-pause-circle-fill';
    } else {
      this.pauseSong();
      // this.play.className = 'bi bi-play-circle-fill';
    }
  }

  nextSong() {
    if (this.index_no < this.All_song.length - 1) {
      this.index_no += 1;
      this.load_track(this.index_no);
      this.playSong();
    } else {
      this.index_no = 0;
      this.load_track(this.index_no);
      this.playSong();

    }
  }


// previous song
  previousSong() {
    if (this.index_no > 0) {
      this.index_no -= 1;
      this.load_track(this.index_no);
      this.playSong();

    } else {
      this.index_no = this.All_song.length;
      this.load_track(this.index_no);
      this.playSong();
    }
  }

  pauseSong() {
    this.track.pause();
    this.playingSong = false;
    // @ts-ignore
    this.play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
  }


  slider_position = 0;

  changeDuration() {
    // let slider_position = 0;
    console.log('change')
    console.log('duraation --->', this.track.duration)
    console.log('slider va lue -->', this.slider.value)

    // @ts-ignore
    this.slider_position = this.track.duration * (document.getElementById('duration_slider').value / 100);
    this.track.currentTime = this.slider_position;
  }

  mute = false;
  listSong: Song[] =[];

  muteSound() {
    this.mute = !this.mute;
    console.log('ths.mute --->', this.mute)
    if (this.mute) {
      this.track.volume = 0;
      this.recent_volume.value = 0;
      this.volume_show.innerHTML = 0;
      this.volume_icon.className = 'bi bi-volume-mute-fill'

    } else {
      this.track.volume = 0.2;
      console.log('this.voluem --->', this.track.volume)
      this.volume_show.value = 20;
      this.volume_show.innerHTML = 20;
      this.recent_volume.value = 20;
      this.volume_icon.className = 'bi bi-megaphone'
    }

  }

  volumeChange() {
    this.volume_show.innerHTML = this.recent_volume.value;
    this.track.volume = this.recent_volume.value / 100;
  }

  range_slider() {
    // console.log('call range slider')
    let position = 50;
    // update slider position
    if (!isNaN(this.track.duration)) {
      position = this.track.currentTime * (100 / this.track.duration);
      this.slider.value = position;
    }


    // function will run when the song is over
    if (this.track.ended) {
      this.play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
      console.log('this.autoplay ===', this.autoplay)
      if (!this.autoplay) {
        console.log('vao if khong ?????')
        if (this.index_no < this.All_song.length - 1) {
          this.index_no += 1;
        } else {
          console.log('index no trogn else -->', this.index_no)
          this.index_no = 0;
        }
        this.load_track(this.index_no);
        this.playSong();
      } else {
        this.playSong()
      }
    }
  }

  autoplaySwitch() {
    this.autoplay = !this.autoplay;
    console.log('auto play')
    if (this.autoplay) {
      // this.autoplay = 0;
      this.auto_play.style.background = "#FF8A65";
    } else {
      // this.autoplay = 1;
      this.auto_play.style.background = "rgba(255,255,255,0.2)";
    }
  }

  resetSlider() {
    this.slider.value = 0;
  }

  openDialogCreate() {
    const dialogRef = this.dialog.open(ListSongComponent, {
      data : {
        dataKey : this.idPlaylist
      }

    });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result||result==undefined){
    //     this.categoryService.getListCategoryService().subscribe(data =>{
    //       this.listCategory = data;
    //       this.dataSource = new MatTableDataSource<Category>(this.listCategory);
    //       this.dataSource.paginator = this.paginator;
    //     })
    //   }
    // })
  }
}
