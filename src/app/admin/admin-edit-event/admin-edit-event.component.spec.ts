import {Location} from '@angular/common';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {AdminEditEventComponent} from './admin-edit-event.component';
import {JsrolService} from '../../services/jsrol.service';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ActivatedRouteStub} from '../../../testing/router-stubs';
import {SharedModule} from '../../shared/shared.module';
describe('Test Admin Edit Event', () => {
  const jsrolService = jasmine.createSpyObj('JsrolService', ['getEvent', 'getEventLoops']);
  let fixture: ComponentFixture<AdminEditEventComponent>;
  let activatedRouteStub = new ActivatedRouteStub();

  const locationStub = jasmine.createSpyObj('Location', ['back']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [AdminEditEventComponent],
      providers: [
        {provide: JsrolService, useValue: jsrolService},
        {provide: ActivatedRoute, useValue: activatedRouteStub},
        {provide: Location, useValue: locationStub}
      ]
    });

    TestBed.overrideComponent(AdminEditEventComponent, {
      set: {
        template: `<div></div>`
      }
    });

    activatedRouteStub.testParams = {eventId: 'EVENT ID'};

    fixture = TestBed.createComponent(AdminEditEventComponent);
  });

  it('Should load event and loops', () => {
    jsrolService.getEvent.and.returnValue(Observable.of({
      name: 'TEST EVENT',
      type: 'LRFN',
      loop1: '11111',
      loop2: '22222',
      loop3: '33333'
    }));
    jsrolService.getEventLoops.and.returnValue(Observable.of([{
      name: 'LOOP 1'
    }, {
      name: 'LOOP 2'
    }]));

    fixture.detectChanges();

    const comp = fixture.componentInstance;

    expect(comp.editForm.name).toBe('TEST EVENT');
    expect(comp.editForm.loop1).toBe('11111');
    expect(comp.editForm.loop2).toBe('22222');
    expect(comp.editForm.loop3).toBe('33333');
  });

  it('Should delete a loop', () => {
    jsrolService.getEvent.and.returnValue(Observable.of({
      name: 'TEST EVENT',
      type: 'LRFN',
      loop1: '11111',
      loop2: '22222',
      loop3: '33333'
    }));
    jsrolService.getEventLoops.and.returnValue(Observable.of([{
      name: 'LOOP 1'
    }, {
      name: 'LOOP 2'
    }]));

    fixture.detectChanges();

    const comp = fixture.componentInstance;

    comp.deleteLoop(1);

    console.log(comp.editForm);

    expect(comp.editForm.loop1).toBe('22222');
    expect(comp.editForm.loop2).toBe('33333');
    expect(comp.editForm.loop3).toBeUndefined();
  });
});
