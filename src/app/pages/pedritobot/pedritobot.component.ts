import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedritobot',
  templateUrl: './pedritobot.component.html',
  styleUrls: ['./pedritobot.component.scss'],
})
export class PedritobotComponent implements OnInit {
  public user;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'))
   }

  ngOnInit() {}

}
