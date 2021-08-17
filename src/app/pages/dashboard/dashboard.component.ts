import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public data : Observable<any> = new Observable();
  public user;
  // public user = JSON.parse(localStorage.getItem('credentials')).user
  constructor() { }

  ngOnInit() {

    
    if(localStorage.getItem('credentials')){
      this.user = JSON.parse(localStorage.getItem('credentials')).user

    }
  }
  

}
