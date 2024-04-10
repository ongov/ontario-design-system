import { newSpecPage } from '@stencil/core/testing';
import { OntarioSearchBox } from '../ontario-search-box';

describe('ontario-search-box', () => {
	describe('snapshot', () => {
		it('should render the expected html', async () => {
			const page = await newSpecPage({
				components: [OntarioSearchBox],
				html: `<ontario-search-box id="ontario-search-box" class="hydrated"></ontario-search-box>`,
			});

			expect(page.root).toMatchSnapshot();
		});
	});
	describe('render', () => {
		it('should render a default search box element', async () => {
			const page = await newSpecPage({
				components: [OntarioSearchBox],
				html: `<ontario-search-box></ontario-search-box>`,
			});
			expect(page.root).toEqualHtml(`
            <ontario-search-box>
                <mock:shadow-root>
                        <form class="ontario-columns ontario-large-6 ontario-large-offset-0 ontario-medium-6 ontario-medium-offset-3 ontario-search__container ontario-small-10" id="ontario-search-form-container" name="searchForm" novalidate="">
                       		<label class="ontario-label" htmlfor="">
             					<span class="ontario-label__flag">
              					(optional)
             					</span>
    	       				</label>    
							<div class="ontario-search__input-container">
                                <input aria-autocomplete="none" autocomplete="off" class="ontario-input ontario-search__input" id="ontario-search-input-field" name="search" required="" type="search" value="">
                                <input class="ontario-search__reset" id="ontario-search-reset" type="reset" value="">
                                <button class="ontario-search__submit" id="ontario-search-box__submit" type="submit">
                                <span>
                                </span>
                            </button>
                            </div>
                        </form>
                
                </mock:shadow-root>
            </ontario-search-box>
        `);
		});
	});
});
