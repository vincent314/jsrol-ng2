import {password} from './password';
import IConfig = mm.IConfig;
export var config:IConfig = {
    mongodb: {
        url: `mongodb://${password.mongo.user}:${password.mongo.pass}@ds033818.mlab.com:33818/grol-staging`
    }
};