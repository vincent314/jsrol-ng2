import 'leaflet';
import {Component, OnChanges, OnInit} from '@angular/core';
import './map.scss';
import {JsrolService} from '../services/jsrol.service';
import {Observable, Subject} from 'rxjs';
import {TrackModel} from '../model/track.model';
const omnivore = require('leaflet-omnivore');
import Layer = L.Layer;
import LatLngBounds = L.LatLngBounds;

@Component({
  selector: 'map',
  providers: [JsrolService],
  styles: [require('./map.scss')],
  template: `<div>
        <div id="mapid"></div>
    </div>`,
  inputs: ['track']
})
export class MapComponent implements OnChanges, OnInit {
  map: L.Map;
  COLORS: string[] = ['#AA0000', '#00AA00', '#0000AA'];
  track: TrackModel;
  mapLayers: Layer[];

  track$ = new Subject<TrackModel>();

  constructor(private jsrolService: JsrolService) {
  }

  ngOnInit() {
    this.mapLayers = [];


    this.map = L.map('mapid');
    Observable.fromEvent(this.map, 'load')
      .first()
      .concat(this.track$)
      .map((track: TrackModel) => {
        return track.kml;
      })
      .flatMap((kmlId: string) => this.loadKml(kmlId))
      .subscribe();

    this.map.setView([50.63, 3.06], 13);
    L.Icon.Default.imagePath = '/images';

    // create the tile layer with correct attribution
    const osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    const osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    const osm: L.TileLayer = L.tileLayer(osmUrl, {attribution: osmAttrib});

    this.map.addLayer(osm);
  }

  ngOnChanges(changes: any) {
    if (changes.track) {
      this.clearMap();

      if (changes.track.currentValue) {
        this.track$.next(changes.track.currentValue);
      }
    }
  }

  loadKml(kmlId: string): Observable<any> {
    if (!kmlId) {
      return Observable.empty();
    }

    return this.jsrolService.getKml(kmlId)
      .do((kmlObject) => {
        var kmlContent = kmlObject.$value;
        const layer: any = omnivore.kml.parse(kmlContent);

        layer.addTo(this.map);

        layer.setStyle({
          color: this.getRandomColor()
        });

        this.map.fitBounds(layer.getBounds() as LatLngBounds, {});
        this.mapLayers.push(layer);
      });
  }

  clearMap() {
    if (this.map && this.mapLayers) {
      this.mapLayers.forEach((layer) => this.map.removeLayer(layer));
      this.mapLayers = [];
    }
  }

  getRandomColor(): string {
    return this.COLORS[Math.floor(this.COLORS.length * Math.random())];
  }
}
