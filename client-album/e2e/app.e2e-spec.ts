import { ClientAlbumPage } from './app.po';

describe('client-album App', () => {
  let page: ClientAlbumPage;

  beforeEach(() => {
    page = new ClientAlbumPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
