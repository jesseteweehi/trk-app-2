import { TrkApp2Page } from './app.po';

describe('trk-app-2 App', function() {
  let page: TrkApp2Page;

  beforeEach(() => {
    page = new TrkApp2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('trk works!');
  });
});
