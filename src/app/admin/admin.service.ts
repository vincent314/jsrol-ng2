import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
@Injectable()
export class AdminService {

    constructor(private http: Http) {
    }

    getKmlFromOpenrunner(id: string) {
        const url: string = `http://www.openrunner.com/kml/exportImportKml.php?id=${id}&km=0`;

        this.http.get(url)
            .subscribe((data)=> {
                console.log(data);
            })
    }
}