import { Selector, t } from 'testcafe';

export default class DetailProductPage {
  // locators
  public productTitle = Selector('#productTitle');
  public author = Selector('a[class*="contributorNameID"]');
  public typeDetail = Selector('#a-autoid-6-announce > span');
  public priceDetail = Selector('#a-autoid-6-announce  span[class*="a-color-price"]');
  public imageDetail = Selector('#img-canvas > img');
  public addToCartBtn = Selector('#add-to-cart-button', { visibilityCheck: true });
  public quantitySelect = Selector('[data-action=quantity-dropdown] [class*="a-column"]');
  public priceBuy = Selector('.inlineBlock-display > span[class*="a-color-price"]');

  public async addToCart() {
    await t.wait(2000)
    await t.click(this.addToCartBtn);
  }
}
