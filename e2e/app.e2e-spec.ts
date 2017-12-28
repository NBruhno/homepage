import { Bruhno.comPage } from './app.po';

describe('bruhno.com App', () => {
  let page: Bruhno.comPage;

  beforeEach(() => {
    page = new Bruhno.comPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
