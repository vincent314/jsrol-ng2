import 'leaflet';
import {Component, Input, OnChanges, OnInit, Output, EventEmitter} from '@angular/core';
import 'leaflet/dist/leaflet.css';
import './map.scss';
import {JsrolService} from '../services/jsrol.service';
const omnivore = require('leaflet-omnivore');
import EventModel = jsrol.EventModel;
import TrackModel = jsrol.TrackModel;
import ILayer = L.ILayer;

@Component({
    selector: 'map',
    providers: [JsrolService],
    template: `<div>
        <div id="mapid"></div>
    </div>`
})
export class MapComponent implements OnChanges, OnInit {
    private map: L.Map;

    @Input()
    private trackId: string;
    private mapLayers: ILayer[];

    @Output()
    private trackChanged = new EventEmitter();

    constructor(public jsrolService: JsrolService) {
    }

    ngOnInit() {
        console.log('OnInit …');
        this.mapLayers = [];

        this.map = L.map('mapid').setView([51.505, -0.09], 13);
        L.Icon.Default.imagePath = '/images';

        // create the tile layer with correct attribution
        const osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
        const osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        const osm: L.TileLayer = new L.TileLayer(osmUrl, {attribution: osmAttrib});

        this.map.addLayer(osm);
    }

    ngOnChanges() {
        console.log('OnChange …');
        if (this.trackId) {
            this.jsrolService.getTrack(this.trackId)
                .subscribe((track: TrackModel)=> {
                    new EventEmitter().emit(track);
                    this.loadKml(track.kml);
                });
        }
    }

    loadKml(kmlId: string) {
        this.jsrolService.getKml(kmlId)
            .subscribe((kmlObject) => {
                this.clearMap();

                var kmlContent = kmlObject.$value;
                const layer = omnivore.kml.parse(kmlContent);
                layer.addTo(this.map);
                this.map.fitBounds(layer.getBounds());
                this.mapLayers.push(layer);
            });
    }

    clearMap() {
        if (this.map && this.mapLayers) {
            this.mapLayers.forEach(this.map.removeLayer);
            this.mapLayers = [];
        }
    }
}
