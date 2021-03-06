import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseauthService } from './services/firebaseauth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private firebaseauthService: FirebaseauthService,
    public afAuth: AngularFireAuth
  ) {

  }
}
