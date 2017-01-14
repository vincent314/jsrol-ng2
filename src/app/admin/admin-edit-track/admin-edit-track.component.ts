import {Component, OnInit, Inject} from '@angular/core';
import {JsrolService} from '../../services/jsrol.service';
import {TrackModel} from '../../model/track.model';
import {ActivatedRoute, Params} from '@angular/router';
import {MdlSnackbarService} from 'angular2-mdl';
import {Subject} from 'rxjs';

@Component({
  selector: 'add-track',
  templateUrl: './admin-edit-track.component.html'
})
export class AdminEditTrackComponent implements OnInit {
  kmlContent:string;
  track:TrackModel;
  track$: Subject<TrackModel> = new Subject();

  constructor(@Inject('TYPES') private TYPES:any[], private jsrolService: JsrolService,
              private route: ActivatedRoute, private mdlSnackbarService: MdlSnackbarService) {
  }

  ngOnInit(): void {
    this.track = {
      name: '',
      type: '',
      distance: 0
    };
    this.kmlContent = '';


    this.route.params
      .filter((params:Params) => params['trackId'])
      .flatMap((params:Params) => {
        return this.jsrolService.getTrack(params['trackId']);
      })
      .subscribe((track: TrackModel)=> {
        this.track = track;
        this.track$.next(track);
      });
  }

  onSubmit(): void {
    const newTrack = this.jsrolService.saveTrack(this.track, this.kmlContent);
    this.track$.next(newTrack);
    this.mdlSnackbarService.showSnackbar({
      message: 'Parcours enregistré'
    });
  }

}
