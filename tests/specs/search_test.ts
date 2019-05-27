import { ClientFunction } from 'testcafe';
import DetailProductPage from '../pageObjects/product_detail_page';
import SearchPage from '../pageObjects/search_page';

const search = new SearchPage();
const itemDetail = new DetailProductPage();

const data = require('../assets/assets');

fixture`It tests Amazon search functionality`.page(data.baseUrl);

test('AS001 - It searches the product based on category -> verifies URL and search results', async (t) => {
  await search.selectCategory(data.product1.category);
  await t.expect(search.categoryField.innerText).eql(data.product1.category);
  await search.searchProduct(data.product1.key);

  const getPageUrl = ClientFunction(() => window.location.href);

  await t
    .expect(getPageUrl())
    .contains(`${data.baseUrl}/s?k=${data.product1.key}&i=${data.product1.url}`)
    .expect(search.resultsText.visible)
    .ok()
    .expect(search.resultsText.innerText)
    .contains(data.product1.key)
    .expect(search.searchInput.value)
    .eql(data.product1.key);
});
test.before(async (t) => {
  await t.navigateTo(`${data.baseUrl}/s?k=${data.product1.key}&i=${data.product1.url}`);
})('AS002 - It navigates to detail page from search page & verifies base elements on the detail page', async (t) => {
  // got to product detail page
  const element = await search.searchItem.withText(data.product1.title);
  await t.click(element);
  const getPageUrl = ClientFunction(() => window.location.href);

  // verify base elements on page
  await t
    .expect(await getPageUrl())
    .contains(`${data.baseUrl}/${data.product1.productUrl}/dp/${data.product1.productId}`)
    .expect(itemDetail.productTitle.innerText)
    .eql(data.product1.title)
    .expect(itemDetail.productTitle.visible)
    .ok()
    .expect(itemDetail.author.innerText)
    .eql(data.product1.author)
    .expect(itemDetail.author.visible)
    .ok()
    .expect(itemDetail.typeDetail.innerText)
    .eql(data.product1.type)
    .expect(itemDetail.typeDetail.visible)
    .ok()
    .expect(itemDetail.priceDetail.innerText)
    .eql(`$${data.product1.price}`)
    .expect(itemDetail.priceDetail.visible)
    .ok()
    .expect(itemDetail.imageDetail.visible && itemDetail.imageDetail.exists)
    .ok();
});
