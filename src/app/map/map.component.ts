import 'leaflet';
import {Component, OnChanges} from '@angular/core';
import {TrackModel} from '../model/track.model';
const omnivore = require('leaflet-omnivore');
import Layer = L.Layer;
import LatLngBounds = L.LatLngBounds;

@Component({
  selector: 'map',
  styles: [require('./map.scss')],
  template: `<div>
        <div id="mapid"></div>
    </div>`,
  inputs: ['kml']
})
export class MapComponent implements OnChanges {
  map: L.Map;
  COLORS: string[] = ['#0000AA'];
  track: TrackModel;
  kml: string;
  mapLayers: Layer[] = [];

  constructor() {
  }

  ngOnChanges(changes: any) {
    if (!this.map) {
      this.initLeaflet();
    }

    if (changes.kml) {
      this.clearMap();
      if (changes.kml.currentValue) {
        this.displayKml(changes.kml.currentValue);
      }
    }
  }

  initLeaflet() {
    this.map = L.map('mapid');
    this.map.setView([50.63, 3.06], 13);
    L.Icon.Default.imagePath = '/images';

    // create the tile layer with correct attribution
    const osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    const osmAttrib = 'M1ap data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    const osm: L.TileLayer = L.tileLayer(osmUrl, {attribution: osmAttrib});

    this.map.addLayer(osm);
  }

  displayKml(kmlContent: string) {
    const layer: any = omnivore.kml.parse(kmlContent);
    layer.addTo(this.map);

    layer.setStyle({
      color: this.getRandomColor()
    });

    this.map.fitBounds(layer.getBounds() as LatLngBounds, {});
    this.mapLayers.push(layer);
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
