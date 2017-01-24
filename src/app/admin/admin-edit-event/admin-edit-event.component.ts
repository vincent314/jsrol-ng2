import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {JsrolService} from '../../services/jsrol.service';
import {Params, ActivatedRoute} from '@angular/router';
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
  loops: TrackModel[]=[];
  @ViewChild('adminLoopDialog')
  adminLoopDialog:AdminLoopPopinComponent;
  currentLoopIdx:number;

  constructor(@Inject('TYPES') private TYPES: any[],
              private jsrolService: JsrolService,
              private route: ActivatedRoute) {
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
    const event:EventModel = Object.assign({}, this.editForm, {
      dateTime: moment(this.editForm).valueOf()
    });
    this.jsrolService.saveEvent(event);
  }

  deleteLoop(index: number) {
    this.loops.splice(index,1);
  }

  loadLoops(event:EventModel){
    this.jsrolService.getEventLoops(event)
      .subscribe((loops: TrackModel[]) => {
        this.loops = loops;
      });
  }

  onAdd(){
    this.currentLoopIdx = this.loops.length;
    this.adminLoopDialog.show();
  }

  onTrackClick(track:TrackModel){
    if(this.currentLoopIdx < 3){
      this.editForm['loop' + (this.currentLoopIdx + 1)] = track.$key;
      this.loops[this.currentLoopIdx] = track;
    }
  }
}
