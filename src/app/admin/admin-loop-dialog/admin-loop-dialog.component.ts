import {Component, ViewChild, EventEmitter, Output} from '@angular/core';
import {MdlDialogComponent} from '@angular-mdl/core';

@Component({
  selector: 'admin-loop-dialog',
  templateUrl: './admin-loop-dialog.component.html',
  styleUrls: ['./admin-loop-dialog.component.scss'],
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
