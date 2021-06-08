import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  user: any;
  info: any;

  constructor() {
    this.user = {};
    this.info = {};
  }

  getCurrentUser() {
    return this.user;
  }

  setCurrentUser(data: any) {
    this.user = data;
  }

  updateCurrentUser(value: any, prop: string | number) {
    this.user[prop] = value;
  }

  getInfoUser() {
    return this.info;
  }

  setInfoUser(data: any) {
    this.info = data;
  }
}
