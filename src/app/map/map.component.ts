import 'leaflet';
import {Component, Input, OnChanges, OnInit, Output, EventEmitter} from '@angular/core';
import './map.scss';
import {JsrolService} from '../services/jsrol.service';
import {Observable} from 'rxjs';
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
    </div>`
})
export class MapComponent implements OnChanges, OnInit {
  map: L.Map;
  COLORS: string[] = ['#AA0000', '#00AA00', '#0000AA'];
  @Input() trackId: string;
  @Output() trackLoaded = new EventEmitter();
  mapLayers: Layer[];
  isReady: boolean = false;

  constructor(public jsrolService: JsrolService) {
  }

  ngOnInit() {
    console.log('MAP - OnInit …');
    this.mapLayers = [];


    this.map = L.map('mapid');
    Observable.fromEvent(this.map, 'load')
      .subscribe(() => {
        this.isReady = true;
        console.log('Map loaded');
      });

    this.map.setView([50.63, 3.06], 13);
    L.Icon.Default.imagePath = '/images';

    // create the tile layer with correct attribution
    const osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    const osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    const osm: L.TileLayer = L.tileLayer(osmUrl, {attribution: osmAttrib});

    this.map.addLayer(osm);
  }

  ngOnChanges(changes: any) {
    console.log('MAP - OnChanges …');

    if (changes.trackId) {
      this.clearMap();

      if (changes.trackId.currentValue) {
        this.jsrolService.getTrack(changes.trackId.currentValue)
          .map((track: TrackModel) => {
            this.trackLoaded.emit(track);
            return track.kml;
          })
          .concatMap((kmlId: string) => this.loadKml(kmlId))
          .subscribe();
      }
    }
  }

  loadKml(kmlId: string): Observable<any> {
    return this.jsrolService.getKml(kmlId)
      .filter(() => this.isReady)
      .do((kmlObject) => {
        var kmlContent = kmlObject.$value;
        const layer:any = omnivore.kml.parse(kmlContent);

        layer.addTo(this.map);

        layer.setStyle({
          color: this.getRandomColor()
        });

        this.map.fitBounds(layer.getBounds() as LatLngBounds,{});
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
