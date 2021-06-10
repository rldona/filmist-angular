import { Injectable } from '@angular/core';
// import { CanActivate } from '@angular/router';

// import * as firebase from 'firebase';

import { FirebaseService } from '../../services/firebase.service';

@Injectable()
export class HomeCanActivate { // implements CanActivate {

  constructor(_firebaseService: FirebaseService) {
    // if (!firebase) {
    //   _firebaseService.init();
    // }
  }

  // canActivate() {
  //   return firebase.auth().currentUser ? true : false;
  // }

}