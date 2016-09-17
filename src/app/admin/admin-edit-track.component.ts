import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {JsrolService} from '../services/jsrol.service';
import {TrackModel} from '../model/track.model';
import {ActivatedRoute} from '@angular/router';
import {KmlModel} from '../model/kml.model';
@Component({
  selector: 'add-track',
  template: require('./admin-edit-track.component.html')
})
export class AdminEditTrackComponent implements OnInit {
  addForm: FormGroup;

  constructor(private fb: FormBuilder, private jsrolService: JsrolService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.addForm = this.fb.group(
      {
        name: '',
        type: '',
        distance: 0,
        kmlContent: ''
      }
    );

    this.route.params
      .flatMap(params => {
        return this.jsrolService.getTrack(params['trackId']);
      })
      .flatMap((track: TrackModel)=> {
        return this.jsrolService.getKml(track.kml)
          .map((kml: KmlModel)=> {
            track.kmlContent = kml.$value;
          });
      })
      .subscribe((track: TrackModel)=> {
        console.log(track);
        this.addForm = this.fb.group(track);
      });
  }

  onSubmit(): void {
    console.log(this.addForm);
    this.jsrolService.saveTrack(this.addForm.value as TrackModel);
  }
}
