import { JsrolNg2Page } from './app.po';

describe('jsrol-ng2 App', function() {
  let page: JsrolNg2Page;

  beforeEach(() => {
    page = new JsrolNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
