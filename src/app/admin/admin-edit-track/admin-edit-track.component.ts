import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {JsrolService} from '../../services/jsrol.service';
import {TrackModel} from '../../model/track.model';
import {ActivatedRoute, Params} from '@angular/router';
import {MdlSelectComponent} from '@angular2-mdl-ext/select';
import {MdlSnackbarService} from 'angular2-mdl';

@Component({
  selector: 'add-track',
  templateUrl: './admin-edit-track.component.html'
})
export class AdminEditTrackComponent implements OnInit {
  track:TrackModel;

  @ViewChild('typeSelect') typeSelect: MdlSelectComponent;

  constructor(@Inject('TYPES') private TYPES:any[], private jsrolService: JsrolService,
              private route: ActivatedRoute, private mdlSnackbarService: MdlSnackbarService) {
  }

  ngOnInit(): void {
    this.track = {
      name: '',
      type: '',
      kmlContent: '',
      distance: 0
    };


    this.route.params
      .filter((params:Params) => params['trackId'])
      .flatMap((params:Params) => {
        return this.jsrolService.getTrack(params['trackId']);
      })
      // .flatMap((track: TrackModel)=> {
      //   return this.jsrolService.getKml(track.kml)
      //     .map((kml: KmlModel)=> {
      //       track.kmlContent = kml.$value;
      //     });
      // })
      .subscribe((track: TrackModel)=> {
        this.track = track;
      });
  }

  onSubmit(): void {
    this.jsrolService.saveTrack(this.track);
    this.mdlSnackbarService.showSnackbar({
      message: 'Parcours enregistré'
    });
  }

  onTypeChanged(){
    console.log(this.track);
  }
}
