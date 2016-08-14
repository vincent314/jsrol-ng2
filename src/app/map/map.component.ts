import 'leaflet';
import {Component, Input, OnChanges, OnInit} from '@angular/core';
import 'leaflet/dist/leaflet.css';
import './map.scss';
import {JsrolService} from '../services/jsrol.service';
import {Observable} from 'rxjs';
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
    private isReady: boolean = false;

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

        this.map.setView([51.505, -0.09], 13);
        L.Icon.Default.imagePath = '/images';

        // create the tile layer with correct attribution
        const osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
        const osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        const osm: L.TileLayer = new L.TileLayer(osmUrl, {attribution: osmAttrib});

        this.map.addLayer(osm);
    }

    ngOnChanges(changes: any) {
        console.log('MAP - OnChanges …');
        if (changes.trackId && changes.trackId.currentValue) {
            this.jsrolService.getTrack(changes.trackId.currentValue)
                .map((track: TrackModel) => track.kml)
                .concatMap((kmlId: string) => this.loadKml(kmlId))
                .subscribe();
        }
    }

    loadKml(kmlId: string): Observable<any> {
        return this.jsrolService.getKml(kmlId)
            .filter(() => this.isReady)
            .do((kmlObject) => {
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
            this.mapLayers.forEach((layer) => this.map.removeLayer(layer));
            this.mapLayers = [];
        }
    }
}
