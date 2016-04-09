import {Track} from './mm';
export class MongoService {

    constructor() {
    }

    public getTracks():Track[] {
        return [{
            name: 'Test T1',
            type: 'LRFN',
            distance: 1234,
            kml: null,
            id: 'id'
        }] as Track[];
    }
}