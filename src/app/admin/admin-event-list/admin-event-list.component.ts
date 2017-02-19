import {Component} from '@angular/core';
import {Subject} from 'rxjs';
import {JsrolService} from '../../services/jsrol.service';
import {Router} from '@angular/router';
import {MdlSnackbarService} from 'angular2-mdl';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';

interface FilterForm {
  fromDate?: string;
  toDate?: string;
}

@Component({
  selector: 'admin-event-list',
  styleUrls: ['admin-event-list.component.scss'],
  templateUrl: './admin-event-list.component.html'
})
export class AdminEventListComponent {
  events$: Subject<EventModel[]> = new Subject<EventModel[]>();
  filterForm: FilterForm;

  constructor(private jsrolService: JsrolService, private router: Router, private snackbarService: MdlSnackbarService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    const fromDate: Date = new Date();
    this.getEvents(fromDate);
    this.filterForm = {fromDate: moment(fromDate).format('YYYY-MM-DD')};
  }

  getEvents(fromDate: Date) {
    this.jsrolService.getEvents(fromDate.valueOf(), 100)
      .subscribe((events: EventModel[]) => {
        this.events$.next(events);
      });
  }

  onEventClick(event: EventModel) {
    this.router.navigate(['admin', 'events', 'edit', event.$key])
  }

  deleteEvent(event: EventModel) {
    this.jsrolService.deleteEvent(event.$key);

    this.snackbarService.showSnackbar({
      message: this.translate.instant('ADMIN.EVENT.CONFIRM_DELETE')
    })
  }

  onFilterChanged() {
    if (this.filterForm.fromDate) {
      this.getEvents(moment(this.filterForm.fromDate).toDate());
    }
  }
}
