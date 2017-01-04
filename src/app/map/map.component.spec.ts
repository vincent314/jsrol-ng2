import {TestBed, ComponentFixture} from '@angular/core/testing';
import {MapComponent} from './map.component';
import {JsrolService} from '../services/jsrol.service';
import {TrackModel} from '../model/track.model';
import {Component} from '@angular/core';
import {Observable} from 'rxjs';

describe('Test Map component', () => {

  describe('Test with host component', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let comp: TestHostComponent;
    let jsrolService = jasmine.createSpyObj('jsrolService', ['getKml']);

    const KML_CONTENT = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>
<Placemark>
  <name>New York City</name>
  <description>New York City</description>
  <Point>
    <coordinates>-74.006393,40.714172,0</coordinates>
  </Point>
</Placemark>
</Document>
</kml>`;

    @Component({
      template: `<div><map [track]="track"></map></div>`
    })
    class TestHostComponent{
      track:TrackModel;
    }

    beforeEach(() => {
      jsrolService.getKml.and.returnValue(Observable.of({$value:KML_CONTENT}));

      TestBed.configureTestingModule({
        declarations: [TestHostComponent, MapComponent],
        providers: [
          MapComponent,
          {
            provide: JsrolService,
            useValue: jsrolService
          }
        ]
      });
      fixture = TestBed.createComponent(TestHostComponent);
      comp = fixture.componentInstance;

      comp.track = {};

      fixture.detectChanges();
    });

    it('should load KML content', () => {
      comp.track = {
        $key: '123456',
        kml:'KML ID'
      };

      fixture.detectChanges();

      expect(jsrolService.getKml).toHaveBeenCalled();
    });
  });
});
