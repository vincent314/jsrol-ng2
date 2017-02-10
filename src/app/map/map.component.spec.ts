import {TestBed, ComponentFixture} from '@angular/core/testing';
import {MapComponent} from './map.component';
import {TrackModel} from '../model/track.model';
import {Component, ViewChild} from '@angular/core';

describe('Test Map component', () => {

  describe('Test with host component', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let comp: TestHostComponent;
    let mapComponent: MapComponent;

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
      template: `<div><map #mapComponent [kml]="kml"></map></div>`
    })
    class TestHostComponent{
      @ViewChild('mapComponent')
      mapComponent:MapComponent;
      kml:string;
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestHostComponent, MapComponent],
        providers: [
          MapComponent
        ]
      });
      fixture = TestBed.createComponent(TestHostComponent);
      comp = fixture.componentInstance;

      mapComponent = comp.mapComponent;

      spyOn(mapComponent, 'clearMap');
      spyOn(mapComponent, 'displayKml');

      fixture.detectChanges();
    });

    it('should load KML content', () => {
      comp.kml = KML_CONTENT;

      fixture.detectChanges();

      expect(mapComponent.displayKml).toHaveBeenCalledWith(KML_CONTENT);
    });
  });
});
