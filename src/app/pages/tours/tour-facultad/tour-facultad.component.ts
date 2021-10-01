import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tour-facultad',
  templateUrl: './tour-facultad.component.html',
  styleUrls: ['./tour-facultad.component.scss'],
})
export class TourFacultadComponent implements OnInit {

  public user;
  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

}
