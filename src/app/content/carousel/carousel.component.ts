import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit{
  ngOnInit(): void {
    // Lấy danh sách các radio button
    var radioButtons = document.querySelectorAll('input[name="slider"]');
    var currentIndex = 0;

    // Tự động chuyển đổi hình ảnh sau một khoảng thời gian
    var interval = setInterval(function() {
      // Di chuyển đến radio button tiếp theo
      currentIndex = (currentIndex + 1) % radioButtons.length;
      // @ts-ignore
      radioButtons[currentIndex].checked = true;
    }, 2000);
  }

}
