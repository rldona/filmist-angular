import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class HomeCanDeactivate implements CanDeactivate<any> {
  canDeactivate() {
    return false; // evita que vuelva al Login
  }
}
