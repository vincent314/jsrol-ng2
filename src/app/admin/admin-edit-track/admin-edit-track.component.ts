import {Component, OnInit, Inject} from '@angular/core';
import {JsrolService} from '../../services/jsrol.service';
import {ActivatedRoute, Params} from '@angular/router';
import {MdlSnackbarService} from 'angular2-mdl';
import {Subject} from 'rxjs';
import {Location} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

interface EditForm extends TrackModel {
  kmlFile?: File
}

@Component({
  selector: 'add-track',
  templateUrl: './admin-edit-track.component.html',
  styles: ['./admin-edit-track.component.scss']
})
export class AdminEditTrackComponent implements OnInit {
  editForm: EditForm;
  track$: Subject<TrackModel> = new Subject();
  kmlContent: string;

  constructor(@Inject('TYPES') private TYPES: any[], private jsrolService: JsrolService,
              private route: ActivatedRoute, private snackbarService: MdlSnackbarService,
              private location: Location, private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.editForm = {
      name: '',
      type: '',
      distance: 0,
      openRunnerId: ''
    };


    this.route.params
      .filter((params: Params) => params['trackId'])
      .flatMap((params: Params) => {
        return this.jsrolService.getTrack(params['trackId']);
      })
      .do((track: TrackModel) => {
        this.editForm = Object.assign({}, track);
        this.track$.next(track);
      })
      .flatMap((track: TrackModel) => {
        return this.jsrolService.getKml(track.kml);
      })
      .map((kmlObj) => kmlObj.$value)
      .subscribe((kml) => {
        this.kmlContent = kml;
      });
  }

  formToTrack(form) {
    return Object.assign({}, form);
  }

  onSubmit(): void {
    const newTrack = this.jsrolService.saveTrack(this.formToTrack(this.editForm), this.kmlContent);
    this.track$.next(newTrack);
    this.snackbarService.showSnackbar({
      message: this.translate.instant('ADMIN.TRACK.SAVE')
    });
  }

  onFileChange(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();

      reader.onload = () => {
        this.kmlContent = reader.result;
      };

      reader.readAsText(fileInput.target.files[0]);
    }
  }

  onGoBack() {
    this.location.back();
  }
}
