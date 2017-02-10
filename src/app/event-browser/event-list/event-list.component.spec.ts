import {TestBed, ComponentFixture} from '@angular/core/testing';
import {EventListComponent} from './event-list.component';
import {JsrolService} from '../../services/jsrol.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
describe('Test event-list', () => {
  const jsrolService = jasmine.createSpyObj('JsrolService', ['getEvents']);
  const router: Router = jasmine.createSpyObj('Router', ['navigate']);

  let fixture: ComponentFixture<EventListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventListComponent],
      providers: [
        {provide: JsrolService, useValue: jsrolService},
        {provide: Router, useValue: router}
      ]
    });
    fixture = TestBed.createComponent(EventListComponent);
  });

  it('should list events', ()=> {
    jsrolService.getEvents.and.returnValue(Observable.of([
      {
        $key: '1234',
        name: 'EVENT-1',
        type: 'RANDOXYGENE',
        dateTime: '2016-09-12',
        loop1: '11111111'
      }, {
        $key: '5678',
        name: 'EVENT-2',
        type: 'LRFN',
        dateTime: '2016-09-10',
        loop1: '2222222'
      }
    ]));

    fixture.detectChanges();

    const element = fixture.nativeElement;

    expect(element.querySelectorAll('.mdl-navigation__link').length).toBe(2);

    expect(element.querySelector('.mdl-navigation__link div').innerText.trim().replace('\n',' ')).toMatch(/Monday 12 September 2016 EVENT-1/);

  });
});
