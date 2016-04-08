import { it, injectAsync, beforeEachProviders, TestComponentBuilder } from 'angular2/testing';
import { MainComponent } from './main.component';

describe('Component: MainComponent', () => {

    beforeEachProviders(() => []);

    it('should be defined', injectAsync([TestComponentBuilder], (tcb) => {
        return tcb.createAsync(MainComponent)
            .then((fixture) => {
                let element = fixture.debugElement.nativeElement;
                let cmpInstance = <MainComponent>fixture.debugElement.componentInstance;
                fixture.detectChanges();

                expect(cmpInstance).toBeDefined();
                expect(element).toBeDefined();
            });
    }));

});