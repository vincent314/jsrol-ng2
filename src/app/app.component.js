"use strict";
$/*
 * Angular 2 decorators and services
 */
var core_1 = require('@angular/core');
/*
 * App Component
 * Top Level Component
 */
var App = (function () {
    function App() {
    }
    App = __decorate([
        core_1.Component({
            selector: 'app',
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [
                require('./app.style.scss')
            ],
            template: " \n    <main>\n      <router-outlet></router-outlet>\n    </main>\n  "
        }),
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
//# sourceMappingURL=app.component.js.map
