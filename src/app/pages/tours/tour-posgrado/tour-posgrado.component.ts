import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tour-posgrado',
  templateUrl: './tour-posgrado.component.html',
  styleUrls: ['./tour-posgrado.component.scss'],
})
export class TourPosgradoComponent implements OnInit {
  public user;
  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

}
