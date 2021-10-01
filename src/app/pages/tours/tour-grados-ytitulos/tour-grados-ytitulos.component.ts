import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tour-grados-ytitulos',
  templateUrl: './tour-grados-ytitulos.component.html',
  styleUrls: ['./tour-grados-ytitulos.component.scss'],
})
export class TourGradosYTitulosComponent implements OnInit {

  public user;
  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
}
