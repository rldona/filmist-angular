import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class DetailCanActivate implements CanActivate {
  canActivate() {
    return window.confirm('Do you want to continue to detail ?');
  }
}
