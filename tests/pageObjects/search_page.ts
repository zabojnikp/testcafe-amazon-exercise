import { Selector, t } from 'testcafe';

export default class SearchPage {
  // locators
  public searchInput = Selector('[id=twotabsearchtextbox]');
  public searchBtn = Selector('input[value=Go]');
  public dropdownBtn = Selector('[class="nav-search-scope nav-sprite"]');
  public categorySelect = Selector('[id=searchDropdownBox]');
  public categoryField = Selector('[data-value="search-alias=aps"]').find('span');
  public resultsText = Selector('[class="a-section a-spacing-small a-spacing-top-small"]')
    .find('span')
    .nth(2);
  public searchResults = Selector('[data-component-type=s-search-results] > [class*="s-result-list "]').find('div');
  public searchItem = this.searchResults.find('a');

  // methods
  public async selectCategory(category: string) {
    const searchOption = this.categorySelect.find('option');
    await t.click(this.dropdownBtn).click(searchOption.withText(category));
  }
  public async searchProduct(product: string) {
    await t.typeText(this.searchInput, product).click(this.searchBtn);
  }
}
