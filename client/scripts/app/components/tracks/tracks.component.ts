import {Component, OnInit} from 'angular2/core';
import {JsrolService} from '../../services/jsrolService';
import ITrack = mm.ITrack;

@Component({
    selector: 'tracks',
    styles: [require('./tracks.component.scss').toString()],
    template: require('./tracks.component.html')
})
export class TracksComponent implements OnInit {

    public tracks:ITrackExt[];
    public errorMessage:string;
    public kmlUrl:string;

    constructor(private jsrolService:JsrolService) {
    }

    ngOnInit() {
        this.getTracks();
    }

    getTracks() {
        this.jsrolService.getTracks()
            .subscribe(
                tracks => this.tracks = tracks,
                error => this.errorMessage = <any>error
            );
    }

    public onClick(track){
        var map:any = document.querySelector('google-map');
        map.kml = track.kmlUrl;
        console.log(track.kmlUrl);
    }
}