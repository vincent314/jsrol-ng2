import {Component, ViewChild, EventEmitter, Output} from '@angular/core';
import {MdlDialogComponent} from 'angular2-mdl';

@Component({
  selector: 'admin-loop-dialog',
  template: require('./admin-loop-dialog.component.html'),
  styles: [require('./admin-loop-dialog.component.scss')],
})
export class AdminLoopPopinComponent {
  @ViewChild('dialog')
  dialog:MdlDialogComponent;
  @Output() trackClick = new EventEmitter<TrackModel>();

  constructor() {

  }

  show(){
    this.dialog.show();
  }

  onTrackClick(track:TrackModel){
    this.trackClick.emit(track);
    this.dialog.close();
  }
}
