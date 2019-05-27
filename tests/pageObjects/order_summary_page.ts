import { Selector, t } from 'testcafe';

export default class OrderSummaryPage {
  public orderedItem = Selector('#huc-v2-order-row-items [class=a-box-inner]', { visibilityCheck: true });
  public orderMsg = Selector('#huc-v2-order-row-items-msg');
  public orderTotalText = Selector('[class*="huc-subtotal"] > span:nth-child(1)');
  public orderTotalPrice = Selector('[class*="huc-subtotal"] > span:nth-child(2)');
  public cartBtn = Selector('#hlb-view-cart', { visibilityCheck: true });
  public checkoutBtn = Selector('#hlb-ptc-btn');
  public itemPicture = Selector('.sc-product-image');
  public itemPictureLink = this.itemPicture.parent('a');
  public itemMiniDetail = Selector('#item-mini-detail');
  public itemTitle = this.itemMiniDetail.find('[class*="product-title"]');
  public itemCreator = this.itemMiniDetail.find('.sc-product-creator');
  public itemPrice = this.itemMiniDetail.find('[class*="color-price sc-price"]');
  public itemStock = this.itemMiniDetail.find('[class*="a-color-success"]');
  public itemTitleLink = this.itemMiniDetail.find('#mdp-title a[class*="sc-product-link"]');
}
