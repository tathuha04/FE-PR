import {Component, ElementRef, ViewChild} from '@angular/core';
import {TokenService} from "../../service/token.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  name = '';
  avatar = '';
  checkLogin = false;

  constructor(private tokenService: TokenService) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.name = this.tokenService.getName();
      this.avatar = this.tokenService.getAvatar();
      this.checkLogin = true;
    }
  }

  logOut() {
    sessionStorage.clear();
    window.location.reload();
  }
  // @ts-ignore
  @ViewChild('menuIcon') menuIcon: ElementRef;
  // @ts-ignore
  @ViewChild('navbar') navbar: ElementRef;

  toggleMenu() {
    this.menuIcon.nativeElement.classList.toggle('bx-x');
    this.navbar.nativeElement.classList.toggle('open');
  }
}
