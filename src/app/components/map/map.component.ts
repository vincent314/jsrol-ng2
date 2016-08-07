import 'leaflet';
import {Component, Input, OnChanges, OnInit} from '@angular/core';
import 'leaflet/dist/leaflet.css';
import './map.scss';
import {JsrolService} from '../../services/jsrol.service';
import {Subscription} from 'rxjs/Rx';
const omnivore = require('leaflet-omnivore');
import Event = jsrol.EventModel;
import Track = jsrol.TrackModel;

@Component({
    selector: 'map',
    providers: [JsrolService],
    template: `<div>
        <h1>MAP {{id}}</h1>
        <p>{{kml | async}}</p>
        <div id="mapid"></div>
    </div>`
})
export class MapComponent implements OnChanges, OnInit {
    private kml: Subscription;
    private map: L.Map;

    @Input()
    private event: Event;

    constructor(public jsrolService: JsrolService) {
    }

    ngOnInit() {
        this.map = L.map('mapid').setView([51.505, -0.09], 13);
        L.Icon.Default.imagePath = '/images';

        // create the tile layer with correct attribution
        const osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
        const osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        const osm: L.TileLayer = new L.TileLayer(osmUrl, {attribution: osmAttrib});

        this.map.addLayer(osm);
    }

    ngOnChanges() {
        if (event) {
            this.jsrolService.getTrack(this.event.loop1 as string)
                .subscribe((track: Track)=> {
                    this.loadKml(track.kml);
                });
        }
    }

    loadKml(kmlId: string) {
        this.jsrolService.getKml(kmlId)
            .subscribe((kmlObject) => {
                var kmlContent = kmlObject.$value;
                const layer = omnivore.kml.parse(kmlContent)
                    .addTo(this.map);
                this.map.fitBounds(layer.getBounds());
            });
    }
}
