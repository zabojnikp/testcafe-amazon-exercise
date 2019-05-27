import OrderSummaryPage from '../pageObjects/order_summary_page';
import DetailProductPage from '../pageObjects/product_detail_page';
import ShoppingCartPage from '../pageObjects/shopping_cart_page';

const data = require('../assets/assets');

const itemDetail = new DetailProductPage();
const orderSummary = new OrderSummaryPage();
const shoppingCartPage = new ShoppingCartPage();

const INCREASED_QTY = '20';
const TOTAL_INCREASED_PRICE = (Number(INCREASED_QTY) * data.product1.price).toFixed(2);
const TOTAL_PRICE = (data.product1.price + data.product2.price).toFixed(2);

fixture`It tests Amazon shopping cart functionality`.page(data.baseUrl).afterEach(async (t) => {
  await t.navigateTo(`${data.baseUrl}/gp/cart/view.html/ref=lh_cart`);
  if (await shoppingCartPage.listContent.exists) {
    let count = await shoppingCartPage.listContent.count;
    while (count) {
      await t.click(shoppingCartPage.removeItemBtn);
      count -= 1;
    }
  }
});

test.before(async (t) => {
  await t.navigateTo(`${data.baseUrl}/${data.product1.productUrl}/dp/${data.product1.productId}`);
})('AW001 - It adds a product to the cart -> verifies elements on pre-checkout page -> transfers to shopping cart', async (t) => {
  // add product to the cart
  await t.expect(itemDetail.priceBuy.innerText).eql(`$${data.product1.price}`);
  await itemDetail.addToCart();
  await t.wait(2000);

  // verify pre-checkout page
  await t
    .expect(orderSummary.orderedItem.visible)
    .ok()
    .expect(orderSummary.orderMsg.innerText)
    .contains('Added to Cart')
    .expect(orderSummary.orderTotalText.innerText)
    .contains(`Cart subtotal (1 item)`)
    .expect(orderSummary.orderTotalPrice.innerText)
    .eql(`$${data.product1.price}`)
    .expect(orderSummary.cartBtn.visible)
    .ok()
    .expect(orderSummary.checkoutBtn.visible)
    .ok();

  // verify user is transfered to shopping cart page
  await t.click(orderSummary.cartBtn);
  await t.expect(shoppingCartPage.pageTitle.visible).ok();
  await t.expect(shoppingCartPage.pageTitle.innerText).eql('Shopping Cart');
});
test.before(async (t) => {
  await t.navigateTo(`${data.baseUrl}/${data.product1.productUrl}/dp/${data.product1.productId}`);
  await itemDetail.addToCart();
  await t.wait(2000);
})('AW002 - It verifies ordered item elements on the pre-checkout page -> transfers to the detail page', async (t) => {
  // verify pre-checkout page
  await t.click(orderSummary.orderedItem);
  await t
    .expect(orderSummary.itemTitle.innerText)
    .eql(data.product1.title)
    .expect(orderSummary.itemCreator.innerText)
    .contains(data.product1.author)
    .expect(orderSummary.itemPrice.innerText)
    .eql(`$${data.product1.price}`)
    .expect(orderSummary.itemStock.innerText)
    .eql(data.product1.stock)
    .expect(orderSummary.itemPicture.visible && orderSummary.itemPicture.exists)
    .ok()
    .expect(orderSummary.itemTitleLink.getAttribute('href'))
    .contains(`/gp/product/${data.product1.productId}/ref=ox_sc_mini_detail`)
    .expect(orderSummary.itemPictureLink.getAttribute('href'))
    .contains(`gp/product/${data.product1.productId}/ref=ox_sc_mini_detail`);

  // verify user is directed to detail page
  await t.click(orderSummary.itemTitleLink);
  await t.expect(itemDetail.productTitle.innerText).eql(data.product1.title);
});
test.before(async (t) => {
  await t.navigateTo(`${data.baseUrl}/${data.product1.productUrl}/dp/${data.product1.productId}`);
  await itemDetail.addToCart();
  await t.navigateTo(`${data.baseUrl}/gp/cart/view.html/ref=lh_cart`);
})('AW003 - It verifies item elements on the shopping cart page for product added to cart', async (t) => {
  await t
    .expect(shoppingCartPage.productTitleText.innerText)
    .contains(data.product1.title)
    .expect(shoppingCartPage.productTitleLink.getAttribute('href'))
    .contains(`/gp/product/${data.product1.productId}/ref=ox_sc_act_title_1`)
    .expect(shoppingCartPage.productCreator.innerText)
    .contains(data.product1.author)
    .expect(shoppingCartPage.productImg.visible)
    .ok()
    .expect(shoppingCartPage.productImgLink.getAttribute('href'))
    .contains(`/gp/product/${data.product1.productId}/ref=ox_sc_act_image_1`)
    .expect(shoppingCartPage.productPrice.innerText)
    .contains(`${data.product1.price}`)
    .expect(shoppingCartPage.productAvailability.innerText)
    .eql(data.product1.stock)
    .expect(shoppingCartPage.productQuantity.value)
    .eql('1')
    .expect(shoppingCartPage.cartSubtotalItems.innerText)
    .contains(`(1 item)`)
    .expect(shoppingCartPage.cartSubtotalPrice.innerText)
    .contains(`${data.product1.price}`);
});
test.before(async (t) => {
  await t.navigateTo(`${data.baseUrl}/${data.product1.productUrl}/dp/${data.product1.productId}`);
  await itemDetail.addToCart();
  await t.navigateTo(`${data.baseUrl}/gp/cart/view.html/ref=lh_cart`);
})('AW004 - It increases the number of items in the cart to 20 -> verifies total price changed', async (t) => {
  await t
    .expect(shoppingCartPage.cartSubtotalItems.innerText)
    .contains(`1 item`)
    .expect(shoppingCartPage.cartSubtotalPrice.innerText)
    .contains(data.product1.price);

  await shoppingCartPage.selectMoreItems();
  await t.typeText(shoppingCartPage.quantityInput, INCREASED_QTY);
  await t.click(shoppingCartPage.quantityUpdateBtn);
  await t
    .expect(shoppingCartPage.quantityInput.value)
    .eql(INCREASED_QTY)
    .expect(shoppingCartPage.productPrice.innerText)
    .contains(`${data.product1.price}`)
    .expect(shoppingCartPage.cartSubtotalItems.innerText)
    .contains(`(${INCREASED_QTY} items)`)
    .expect(shoppingCartPage.cartSubtotalPrice.innerText)
    .contains(TOTAL_INCREASED_PRICE)
    .expect(shoppingCartPage.boxTotalItems.innerText)
    .contains(`(${INCREASED_QTY} items)`)
    .expect(shoppingCartPage.boxTotalPrice.innerText)
    .contains(`$${TOTAL_INCREASED_PRICE}`);
});
test.before(async (t) => {
  await t.navigateTo(`${data.baseUrl}/${data.product1.productUrl}/dp/${data.product1.productId}`);
  await itemDetail.addToCart();
  await t.navigateTo(`${data.baseUrl}/gp/cart/view.html/ref=lh_cart`);
})('AW005 - It verifies an user can save an item from for later -> price updates accordingly -> product is saved in a separate list ', async (t) => {
  await t.click(shoppingCartPage.saveForLaterBtn);
  await t
    .expect(shoppingCartPage.pageTitle.innerText)
    .eql('Shopping Cart')
    .expect(shoppingCartPage.saveLaterText.innerText)
    .contains(`${data.product1.title} has been moved to Save for Later.`)
    .expect(shoppingCartPage.saveLaterTextLink.getAttribute('href'))
    .contains(`/gp/product/${data.product1.productId}/ref=ox_sc_act_title_1`)
    .expect(shoppingCartPage.cartSubtotalItems.innerText)
    .contains(`0 items`)
    .expect(shoppingCartPage.cartSubtotalPrice.innerText)
    .contains('0.00');

  await t
    .expect(shoppingCartPage.savedCardTitle.innerText)
    .eql('Saved for later (1 item)')
    .expect(shoppingCartPage.productTitleText.innerText)
    .contains(data.product1.title)
    .expect(shoppingCartPage.productTitleLink.getAttribute('href'))
    .contains(`/gp/product/${data.product1.productId}/ref=ox_sc_saved_title_1`)
    .expect(shoppingCartPage.productCreator.innerText)
    .contains(data.product1.author)
    .expect(shoppingCartPage.productImg.visible)
    .ok()
    .expect(shoppingCartPage.productImgLink.getAttribute('href'))
    .contains(`/gp/product/${data.product1.productId}/ref=ox_sc_saved_image_1`)
    .expect(shoppingCartPage.productPrice.innerText)
    .contains(`${data.product1.price}`)
    .expect(shoppingCartPage.productAvailability.innerText)
    .eql(data.product1.stock)
    .expect(shoppingCartPage.removeItemBtn.visible && shoppingCartPage.removeItemBtn.exists)
    .ok()
    .expect(shoppingCartPage.moveToCartBtn.visible && shoppingCartPage.moveToCartBtn.exists)
    .ok();
});
test.before(async (t) => {
  await t.navigateTo(`${data.baseUrl}/${data.product1.productUrl}/dp/${data.product1.productId}`);
  await itemDetail.addToCart();
  await t.navigateTo(`${data.baseUrl}/gp/cart/view.html/ref=lh_cart`);
  await t
    .expect(shoppingCartPage.cartSubtotalItems.innerText)
    .contains(`1 item`)
    .expect(shoppingCartPage.cartSubtotalPrice.innerText)
    .contains(data.product1.price);
})('AW006 - It removes a product from the cart -> verifies changes.', async (t) => {
  await t.click(shoppingCartPage.removeItemBtn);
  await t
    .expect(shoppingCartPage.emptyCartTitle.innerText)
    .eql('Your Shopping Cart is empty.')
    .expect(shoppingCartPage.removedText.innerText)
    .eql(`${data.product1.title} was removed from Shopping Cart.`)
    .expect(shoppingCartPage.removedTextLink.getAttribute('href'))
    .contains(`/gp/product/${data.product1.productId}/ref=ox_sc_act_title_1`)
    .expect(shoppingCartPage.cartSubtotalItems.innerText)
    .contains(`0 items`)
    .expect(shoppingCartPage.cartSubtotalPrice.innerText)
    .contains('0.00');
});
test.before(async (t) => {
  await t.navigateTo(`${data.baseUrl}/${data.product1.productUrl}/dp/${data.product1.productId}`);
  await itemDetail.addToCart();
  await t.navigateTo(`${data.baseUrl}/${data.product2.productUrl}/dp/${data.product2.productId}`);
  await itemDetail.addToCart();
  await t.wait(2000);
})('AW007 - It adds another product to cart -> verifies the price on the summary page -> price on the shopping cart page.', async (t) => {
  // verify pre-checkout page
  await t
    .expect(orderSummary.orderedItem.visible)
    .ok()
    .expect(orderSummary.orderMsg.innerText)
    .contains('Added to Cart')
    .expect(orderSummary.orderTotalText.innerText)
    .contains(`Cart subtotal (2 items)`)
    .expect(orderSummary.orderTotalPrice.innerText)
    .eql(`$${TOTAL_PRICE}`);

  // verify shopping cart page
  await t.click(orderSummary.cartBtn);
  await t
    .expect(shoppingCartPage.cartSubtotalItems.innerText)
    .contains(`(2 items)`)
    .expect(shoppingCartPage.cartSubtotalPrice.innerText)
    .contains(TOTAL_PRICE)
    .expect(shoppingCartPage.boxTotalItems.innerText)
    .contains(`2 items)`)
    .expect(shoppingCartPage.boxTotalPrice.innerText)
    .contains(`$${TOTAL_PRICE}`);
});
test.before(async (t) => {
  await t.navigateTo(`${data.baseUrl}/${data.product1.productUrl}/dp/${data.product1.productId}`);
  await itemDetail.addToCart();
  await t.navigateTo(`${data.baseUrl}/${data.product2.productUrl}/dp/${data.product2.productId}`);
  await itemDetail.addToCart();
  await t.wait(2000);
})('AW008 - It adds another product -> verifies an item on summary page -> items on the summary cart page.', async (t) => {
  // verify item on pre-checkout page
  await t.click(orderSummary.orderedItem);
  await t
    .expect(orderSummary.itemTitle.innerText)
    .contains(data.product2.title)
    .expect(orderSummary.itemCreator.innerText)
    .contains(data.product2.author)
    .expect(orderSummary.itemPrice.innerText)
    .eql(`$${data.product2.price}`)
    .expect(orderSummary.itemPicture.visible && orderSummary.itemPicture.exists)
    .ok()
    .expect(orderSummary.itemTitleLink.getAttribute('href'))
    .contains(`/gp/product/${data.product2.productId}/ref=ox_sc_mini_detail`)
    .expect(orderSummary.itemPictureLink.getAttribute('href'))
    .contains(`gp/product/${data.product2.productId}/ref=ox_sc_mini_detail`);

  // verify items on shopping carts
  await t.click(orderSummary.cartBtn);
  await t
    .expect(shoppingCartPage.productTitleText.innerText)
    .contains(data.product2.title)
    .expect(shoppingCartPage.productTitleLink.getAttribute('href'))
    .contains(`/gp/product/${data.product2.productId}/ref=ox_sc_act_title_1`)
    .expect(shoppingCartPage.productImg.visible)
    .ok()
    .expect(shoppingCartPage.productImgLink.getAttribute('href'))
    .contains(`/gp/product/${data.product2.productId}/ref=ox_sc_act_image_1`)
    .expect(shoppingCartPage.productPrice.innerText)
    .contains(`${data.product2.price}`)
    .expect(shoppingCartPage.productAvailability.innerText)
    .contains(data.product2.stock)
    .expect(shoppingCartPage.productQuantity.value)
    .eql('1');
  await t
    .expect(shoppingCartPage.productTitleText.nth(1).innerText)
    .contains(data.product1.title)
    .expect(shoppingCartPage.productTitleLink.nth(1).getAttribute('href'))
    .contains(`/gp/product/${data.product1.productId}/ref=ox_sc_act_title_2`)
    .expect(shoppingCartPage.productImg.nth(1).visible)
    .ok()
    .expect(shoppingCartPage.productImgLink.nth(1).getAttribute('href'))
    .contains(`/gp/product/${data.product1.productId}/ref=ox_sc_act_image_2`)
    .expect(shoppingCartPage.productPrice.nth(1).innerText)
    .contains(`${data.product1.price}`)
    .expect(shoppingCartPage.productAvailability.nth(1).innerText)
    .contains(data.product1.stock)
    .expect(shoppingCartPage.productQuantity.nth(1).value)
    .eql('1');
});
