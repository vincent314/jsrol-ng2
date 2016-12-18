import {Component, OnInit, Inject} from '@angular/core';
import {TypeModel} from '../../model/type.model';
import {Observable, Subject} from 'rxjs';
import {JsrolService} from '../../services/jsrol.service';
import {Params, ActivatedRoute} from '@angular/router';
import {EventModel} from '../../model/event.model';
import {TrackModel} from '../../model/track.model';
import moment = require('moment');


interface EditForm{
  name: string,
  type: string,
  dateTime: number,
  loop1?: string,
  loop2?: string,
  loop3?: string
}

@Component({
  selector: 'jsrol-edit-event',
  templateUrl: './admin-edit-event.component.html',
  styleUrls: ['admin-edit-event.component.scss']
})
export class AdminEditEventComponent implements OnInit{
  editForm: EditForm;
  types$: Observable<TypeModel[]>;
  loops$: Observable<TrackModel[]>;
  event$ = new Subject<EventModel>();


  constructor(@Inject('TYPES') private TYPES:any[], private jsrolService: JsrolService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.editForm = {
      name: '',
      type: '',
      dateTime: 0,
      loop1: '',
      loop2: '',
      loop3: ''
    };

    // this.addForm.statusChanges.subscribe((value) => console.log({value}));
    this.route.params
      .filter((params: Params) => params['eventId'])
      .flatMap((params: Params) => this.jsrolService.getEvent(params['eventId']))
      .subscribe((event: EventModel) => {
        Object.assign(this.editForm, event, {
          dateTime: moment(event.dateTime).format('DD/MM/YYYY')
        });

        this.loops$ = this.jsrolService.getEventLoops(event);
      });
  }

}
