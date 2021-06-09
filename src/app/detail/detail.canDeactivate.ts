import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class DetailCanDeactivate implements CanDeactivate<any> {
  canDeactivate() {
    return window.confirm('Do you want to leave the view ?');
  }
}
