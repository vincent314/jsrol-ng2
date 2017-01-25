import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {JsrolService} from '../../services/jsrol.service';
import {Params, ActivatedRoute, Router} from '@angular/router';
import {AdminLoopPopinComponent} from '../admin-loop-dialog/admin-loop-dialog.component';
import moment = require('moment');

interface EditForm {
  name?: string,
  type?: string,
  dateTime?: Date,
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
  loops: TrackModel[] = [];
  @ViewChild('adminLoopDialog')
  adminLoopDialog: AdminLoopPopinComponent;
  currentLoopIdx: number;

  constructor(@Inject('TYPES') private TYPES: any[],
              private jsrolService: JsrolService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.editForm = {
      name: '',
      type: '',
    };

    this.route.params
      .filter((params: Params) => params['eventId'])
      .flatMap((params: Params) => {
        return this.jsrolService.getEvent(params['eventId']);
      })
      .subscribe((event: EventModel) => {
        Object.assign(this.editForm, event, {dateTime: moment(event.dateTime).format('YYYY-MM-DD')});
        this.loadLoops(event);
      });
  }

  onSubmit() {
    const event: EventModel = Object.assign({}, this.editForm, {
      dateTime: moment(this.editForm).valueOf()
    });
    this.jsrolService.saveEvent(event);
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  deleteLoop(index: number) {
    this.loops.splice(index, 1);

    const KEYS = ['loop1', 'loop2', 'loop3'];
    KEYS.forEach((key) => {
      this.editForm[key] = null;
    });

    this.loops.forEach((loop: TrackModel, i: number) => {
      this.editForm[KEYS[i]] = loop.$key;
    });
  }

  loadLoops(event: EventModel) {
    this.jsrolService.getEventLoops(event)
      .subscribe((loops: TrackModel[]) => {
        this.loops = loops;
      });
  }

  onAdd() {
    this.currentLoopIdx = this.loops.length;
    this.adminLoopDialog.show();
  }

  onTrackClick(track: TrackModel) {
    if (this.currentLoopIdx < 3) {
      this.editForm['loop' + (this.currentLoopIdx + 1)] = track.$key;
      this.loops[this.currentLoopIdx] = track;
    }
  }
}
