import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {TypeModel} from '../../model/type.model';
import {Observable, Subject} from 'rxjs';
import {JsrolService} from '../../services/jsrol.service';
import {Params, ActivatedRoute} from '@angular/router';
import {EventModel} from '../../model/event.model';
import {TrackModel} from '../../model/track.model';
import moment = require('moment');


@Component({
  selector: 'jsrol-edit-event',
  templateUrl: './admin-edit-event.component.html',
  styleUrls: ['admin-edit-event.component.scss']
})
export class AdminEditEventComponent implements OnInit{
  addForm: FormGroup;
  types$: Observable<TypeModel[]>;
  loops$: Observable<TrackModel[]>;
  event$ = new Subject<EventModel>();


  constructor(private fb: FormBuilder, private jsrolService: JsrolService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.types$ = this.jsrolService.types$;

    this.addForm = this.fb.group({
      name: new FormControl(),
      type: new FormControl(),
      dateTime: new FormControl(),
      loop1: new FormControl(),
      loop2: new FormControl(),
      loop3: new FormControl()
    });

    // this.addForm.statusChanges.subscribe((value) => console.log({value}));
    this.addForm.valueChanges.subscribe((control) => {
      console.log({control});
      setTimeout(() => {
        componentHandler.upgradeDom();
        console.log('UPGRADE');
      }, 2000);
    });

    this.route.params
      .filter((params: Params) => params['eventId'])
      .flatMap((params: Params) => this.jsrolService.getEvent(params['eventId']))
      .subscribe((event: EventModel) => {
        const group = Object.assign({}, event, {
          dateTime: moment(event.dateTime).format('DD/MM/YYYY')
        });

        this.addForm.patchValue(group);

        this.loops$ = this.jsrolService.getEventLoops(event);

        componentHandler.upgradeDom();
      });
  }

}
