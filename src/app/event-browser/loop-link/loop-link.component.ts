import {Component} from '@angular/core';
import { AppState } from '../../store/state';
import { Store } from '@ngrx/store';
import { ChangeTrackAction } from '../../store/event-browser/event-browser.actions';
import { Observable } from 'rxjs/Observable';
import { getTrackSelector } from '../../store/selectors';
@Component({
  selector: 'loop-link',
  templateUrl: './loop-link.component.html',
  styleUrls: [
    './loop-link.component.scss'
  ],
  inputs: ['loop', 'index']
})
export class LoopLinkComponent {

  loop: TrackModel;
  index: number;
  currentTrack$: Observable<TrackModel>;

  constructor(private store: Store<AppState>){
    this.currentTrack$ = store.select(getTrackSelector)
  }

  onLoopClick(loop:TrackModel){
    this.store.dispatch(new ChangeTrackAction(loop));
  }
}
