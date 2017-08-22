import { HpV0.2Page } from './app.po';

describe('hp-v0.2 App', () => {
  let page: HpV0.2Page;

  beforeEach(() => {
    page = new HpV0.2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
