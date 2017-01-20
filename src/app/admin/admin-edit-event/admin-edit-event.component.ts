import {Component, OnInit, Inject} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {JsrolService} from '../../services/jsrol.service';
import {Params, ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import moment = require('moment');

interface EditForm {
  name: string,
  type: string,
  dateTime: number,
  loop1?: string,
  loop2?: string,
  loop3?: string
}

@Component({
  selector: 'jsrol-edit-event',
  template: require('./admin-edit-event.component.html'),
  styles: [require('./admin-edit-event.component.scss')]
})
export class AdminEditEventComponent implements OnInit {
  editForm: EditForm;
  types$: Observable<TypeModel[]>;
  loops$:Subject<TrackModel[]> = new Subject<TrackModel[]>();


  constructor(@Inject('TYPES') private TYPES: any[],
              private jsrolService: JsrolService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.editForm = {
      name: '',
      type: '',
      dateTime: 0
    };

    this.route.params
      .filter((params: Params) => params['eventId'])
      .flatMap((params: Params) => {
        return this.jsrolService.getEvent(params['eventId']);
      })
      .subscribe((event: EventModel) => {
        Object.assign(this.editForm, event, {
          dateTime: moment(event.dateTime).format('DD/MM/YYYY')
        });

        this.loadLoops(event);
      });
  }

  onSubmit() {
    console.debug('Submit performed');
  }

  deleteLoop(index: number) {
    const keys = ['loop1', 'loop2', 'loop3'];

    this.editForm[keys[index]] = '';
    const values = _(keys)
      .map(loop => this.editForm[loop])
      .compact()
      .value();

    _(keys).forEach((key, i) => this.editForm[key] = (i < values.length) ? values[i] : '');
    this.loadLoops(this.editForm);

  }

  addLoop() {
    console.debug('add loop performed');
    this.router.navigate(['loop'], {relativeTo: this.route});
  }

  loadLoops(event:EventModel){
    this.jsrolService.getEventLoops(event)
      .subscribe((loops: TrackModel[]) => {
        this.loops$.next(loops);
      });
  }
}
