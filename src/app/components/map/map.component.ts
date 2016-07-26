import 'leaflet';
const omnivore = require('leaflet-omnivore');
import {Component} from '@angular/core';

import 'leaflet/dist/leaflet.css';
import './map.scss';
import {ActivatedRoute} from '@angular/router';
import {JsrolService} from '../../services/jsrol.service';
import {Subscription} from 'rxjs/Rx';

@Component({
    selector: 'map',
    providers: [JsrolService],
    template: `<div>
        <h1>MAP {{id}}</h1>
        <p>{{kml | async}}</p>
        <div id="mapid"></div>
    </div>`
})
export class MapComponent {
    private id:string;
    private kml:Subscription;
    private route:ActivatedRoute;
    private jsrolService:JsrolService;

    constructor(route:ActivatedRoute, jsrolService:JsrolService) {
        this.route = route;
        this.jsrolService = jsrolService;
    }

    ngOnInit() {
        this.initMap();
    }

    initMap() {
        const map:L.Map = L.map('mapid').setView([51.505, -0.09], 13);
        L.Icon.Default.imagePath = '/images';

        // create the tile layer with correct attribution
        const osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
        const osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        const osm:L.TileLayer = new L.TileLayer(osmUrl, {attribution: osmAttrib});

        map.addLayer(osm);

        this.route.params.subscribe(params => {
            this.id = params['id'];

            console.log(this.id);

            this.jsrolService.getKml(this.id)
                .subscribe((kmlObject) => {
                    var kmlContent = kmlObject.$value;
                    const layer = omnivore.kml.parse(kmlContent)
                        .addTo(map);
                    map.fitBounds(layer.getBounds());
                });
        });
    }
}
