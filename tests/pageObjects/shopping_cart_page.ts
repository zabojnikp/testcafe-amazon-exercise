import { Selector, t } from 'testcafe';

export default class ShoppingCartPage {
  public activeCard = Selector('#sc-active-cart');
  public pageTitle = this.activeCard.find('h2');
  public emptyCartTitle = this.activeCard.find('h1');
  public listContent = Selector('[class=sc-list-item-content] > div');
  public productImg = Selector(' [class*="sc-product-image"]');
  public productImgLink = this.productImg.parent('a');
  public productTitleLink = Selector('[class*="a-list-item"] a[class*="sc-product-link"]');
  public productTitleText = this.productTitleLink.find('span');
  public productCreator = Selector('[class*="a-list-item"] [class*="sc-product-creator"]');
  public productPrice = Selector('[class*="sc-product-price"]');
  public productAvailability = Selector('[class*="sc-product-availability"] *');
  public productQuantity = Selector('[class*="sc-action-quantity-right"] input');
  public removeItemBtn = Selector('input[value=Delete]');
  public removedText = Selector('[data-action=delete] span');
  public removedTextLink = this.removedText.find('a');
  public saveForLaterBtn = Selector('input[name*=save-for-later]');
  public saveLaterText = Selector('[data-action=save-for-later] span');
  public saveLaterTextLink = this.saveLaterText.find('a');
  public moveToCartBtn = Selector('input[name*=move-to-cart]');
  public quantityDropdown = Selector('[class*=sc-action-quantity]');
  public quantityInput = Selector('input[name=quantityBox]');
  public quantityUpdateBtn = Selector('[data-action=update]');
  public cartSubtotalItems = Selector('#sc-subtotal-label-activecart');
  public cartSubtotalPrice = Selector('#sc-subtotal-amount-activecart > span');
  public boxTotalPrice = Selector('#sc-buy-box [class*="sc-price-sign"]');
  public boxTotalItems = Selector('#sc-buy-box [class*="sc-subtotal a-spacing-mini"] span > span:nth-child(1)');
  public savedCard = Selector('#savedCartViewForm');
  public savedCardTitle = this.savedCard.find('h2 > div');

  public async selectMoreItems() {
    await t.click(this.quantityDropdown);
    await t.click(Selector('#dropdown1_9'));
  }
}
