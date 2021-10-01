import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {

  public openLinkTour:boolean = false;
  constructor(
    public firebaseauthService: FirebaseauthService,
    public afAuth: AngularFireAuth,
    public router: Router,
    public toastController: ToastController,
    public route:ActivatedRoute
  ) { }

  ngOnInit() {}

  desloguear(){
    this.firebaseauthService.logout().then( _=>{
      this.router.navigateByUrl('/login')
    } )
  }


}
