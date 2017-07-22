import { PatrimonialPage } from './app.po';

describe('patrimonial App', () => {
  let page: PatrimonialPage;

  beforeEach(() => {
    page = new PatrimonialPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
