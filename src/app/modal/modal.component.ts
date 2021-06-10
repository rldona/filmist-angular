import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

import { DbmoviesService } from '../../services/dbmovies.service';

@Component({
  selector: 'fm-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() btnTitle: string;

  @Input() showBtnClose?: boolean;
  @Input() showModal: boolean;

  constructor(private _dbmoviesService: DbmoviesService, private _location: Location) { }

  closeModal() {
    this._dbmoviesService.showModal = false;
    this.showModal = this._dbmoviesService.showModal;
  }

  goBack() {
    this._location.back();
  }
}
