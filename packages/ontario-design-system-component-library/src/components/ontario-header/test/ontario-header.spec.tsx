import { newSpecPage } from '@stencil/core/testing';
import { OntarioHeader } from '../ontario-header';

describe('ontario-header', () => {
	it('should render application header', async () => {
		const page = await newSpecPage({
			components: [OntarioHeader],
			html: `<ontario-header
        type="application"
        application-header-info='{
					"name": "Application name" ,
					"href": "/"
				}'

				language-toggle-options='{
					"englishLink":"/en",
					"frenchLink": "/fr"
				}'

				menu-items='[{
					"name": "Health",
					"href": "/ontario-hint"
				},{
					"name": "Financial",
					"href": "/ontario-hint"
				},{
					"name": "Financial",
					"href": "/ontario-hint"
				},{
					"name": "Financial",
					"href": "/ontario-hint"
				},{
					"name": "Financial",
					"href": "/ontario-hint"
				},{
					"name": "Financial",
					"href": "/ontario-hint"
				}]'
      ></ontario-header>`,
		});
		expect(page.root).toEqualHtml(`
    <ontario-header
        type="application"
        application-header-info='{
					"name": "Application name" ,
					"href": "/"
				}'
				language-toggle-options='{
					"englishLink":"/en",
					"frenchLink": "/fr"
				}'
				menu-items='[{
					"name": "Health",
					"href": "/ontario-hint"
				},{
					"name": "Financial",
					"href": "/ontario-hint"
				},{
					"name": "Financial",
					"href": "/ontario-hint"
				},{
					"name": "Financial",
					"href": "/ontario-hint"
				},{
					"name": "Financial",
					"href": "/ontario-hint"
				},{
					"name": "Financial",
					"href": "/ontario-hint"
				}]'>
       <mock:shadow-root>
         <div>
           <div class="ontario-application-header-container" id="ontario-application-header">
             <div class="ontario-application-header-container">
               <section class="ontario-application-header">
                 <div class="ontario-row">
                   <div class="ontario-application-header__logo ontario-columns ontario-small-6">
                     <a href="https://www.ontario.ca/page/government-ontario">
                       <img alt="Government of Ontario" src="/assets/ontario-logo-application-header.svg">
                     </a>
                   </div>
                   <div class="ontario-application-header__lang-toggle ontario-columns ontario-small-6">
                     <a class="ontario-header-button ontario-header-button--without-outline" href="/fr">
                       <abbr class="ontario-show-for-small-only" title="Français">
                         FR
                       </abbr>
                       <span class="ontario-show-for-medium">
                         Français
                       </span>
                     </a>
                   </div>
                 </div>
               </section>
             </div>
             <div class="ontario-application-subheader-menu__container">
               <section class="ontario-application-subheader">
                 <div class="ontario-row">
                   <div class="ontario-application-subheader__container ontario-columns ontario-small-12">
                     <p class="ontario-application-subheader__heading">
                       <a href="/">
                         Application name
                       </a>
                     </p>
                     <div class="ontario-application-subheader__menu-container">
                       <div class="ontario-show-for-large">
                         <ul class="ontario-application-subheader__menu">
                           <li>
                             <a href="/ontario-hint">
                               Health
                             </a>
                           </li>
                           <li>
                             <a href="/ontario-hint">
                               Financial
                             </a>
                           </li>
                           <li>
                             <a href="/ontario-hint">
                               Financial
                             </a>
                           </li>
                           <li>
                             <a href="/ontario-hint">
                               Financial
                             </a>
                           </li>
                           <li>
                             <a href="/ontario-hint">
                               Financial
                             </a>
                           </li>
                         </ul>
                       </div>
                       <div class="ontario-hide-for-large ontario-hide-for-small ontario-show-for-medium">
                         <ul class="ontario-application-subheader__menu">
                           <li>
                             <a href="/ontario-hint">
                               Health
                             </a>
                           </li>
                           <li>
                             <a href="/ontario-hint">
                               Financial
                             </a>
                           </li>
                         </ul>
                       </div>
                       <div>
                         <button aria-hidden="false" aria-label="close menu" class="ontario-application-navigation--closed ontario-header-button ontario-header-button--with-outline ontario-header__menu-toggler" id="ontario-application-header-menu-toggler">
                           <div class="ontario-icon-container"></div>
                           <span>
                             Menu
                           </span>
                         </button>
                       </div>
                     </div>
                   </div>
                 </div>
               </section>
               <nav aria-hidden="false" class="ontario-application-navigation" id="ontario-application-navigation" role="navigation">
                 <div class="ontario-application-navigation ontario-application-navigation__container ontario-navigation--closed">
                   <ul>
                     <li class="ontario-show-for-small-only">
                       <a href="/ontario-hint" tabindex="-1">
                         Health
                       </a>
                     </li>
                     <li class="ontario-show-for-small-only">
                       <a href="/ontario-hint" tabindex="-1">
                         Financial
                       </a>
                     </li>
                     <li class="ontario-hide-for-large">
                       <a href="/ontario-hint" tabindex="-1">
                         Financial
                       </a>
                     </li>
                     <li class="ontario-hide-for-large">
                       <a href="/ontario-hint" tabindex="-1">
                         Financial
                       </a>
                     </li>
                     <li class="ontario-hide-for-large">
                       <a href="/ontario-hint" tabindex="-1">
                         Financial
                       </a>
                     </li>
                     <li>
                       <a href="/ontario-hint" tabindex="-1">
                         Financial
                       </a>
                     </li>
                   </ul>
                 </div>
               </nav>
             </div>
           </div>
         </div>
       </mock:shadow-root>
     </ontario-header>
    `);
	});
	it('should render ontario header', async () => {
		const page = await newSpecPage({
			components: [OntarioHeader],
			html: `<ontario-header
        type="ontario"
				language-toggle-options='{
					"englishLink":"/en",
					"frenchLink": "/fr"
				}'
				menu-items='[{
					"name": "Health",
					"href": "/ontario-hint"
				},{
					"name": "Financial",
					"href": "/ontario-hint"
				},{
					"name": "Financial",
					"href": "/ontario-hint"
				},{
					"name": "Financial",
					"href": "/ontario-hint"
				},{
					"name": "Financial",
					"href": "/ontario-hint"
				},{
					"name": "Financial",
					"href": "/ontario-hint"
				}]'
      ></ontario-header>`,
		});
		expect(page.root).toEqualHtml(`
    <ontario-header
        type="ontario"
				language-toggle-options='{
					"englishLink":"/en",
					"frenchLink": "/fr"
				}'
				menu-items='[{
					"name": "Health",
					"href": "/ontario-hint"
				},{
					"name": "Financial",
					"href": "/ontario-hint"
				},{
					"name": "Financial",
					"href": "/ontario-hint"
				},{
					"name": "Financial",
					"href": "/ontario-hint"
				},{
					"name": "Financial",
					"href": "/ontario-hint"
				},{
					"name": "Financial",
					"href": "/ontario-hint"
				}]'
      >
      <mock:shadow-root>
        <div>
          <div class="ontario-header__container">
            <header class="ontario-header" id="ontario-header">
              <div class="ontario-row">
                <div class="ontario-columns ontario-header__logo-container ontario-hide-for-small-only ontario-large-3 ontario-medium-4 ontario-small-2">
                  <a href="https://www.ontario.ca/page/government-ontario">
                    <img alt="Government of Ontario" class="ontario-show-for-medium" src="/assets/ontario-logo--desktop.svg">
                  </a>
                </div>
                <div class="ontario-columns ontario-header__logo-container ontario-large-3 ontario-medium-4 ontario-show-for-small-only ontario-small-2">
                  <a href="https://www.ontario.ca/page/government-ontario">
                    <img alt="Government of Ontario" class="ontario-show-for-small-only" src="/assets/ontario-logo--mobile.svg">
                  </a>
                </div>
                <form aria-hidden="false" class="ontario-columns ontario-header__search-container ontario-large-6 ontario-large-offset-0 ontario-medium-6 ontario-medium-offset-3 ontario-small-10" id="ontario-search-form-container" name="searchForm" novalidate="">
                  <label class="ontario-show-for-sr" htmlfor="ontario-search-input-field">
                    Search
                  </label>
                  <input aria-autocomplete="none" autocomplete="off" class="ontario-header__search-input ontario-input" id="ontario-search-input-field" name="search" required="" type="text">
                  <input aria-label="Clear" class="ontario-header__search-reset" id="ontario-search-reset" type="reset" value="">
                  <button class="ontario-header__search-submit" id="ontario-search-submit" type="submit">
                    <div class="ontario-icon-container"></div>
                    <span class="ontario-show-for-sr">
                      Submit
                    </span>
                  </button>
                </form>
                <div class="ontario-columns ontario-header__nav-right-container ontario-large-3 ontario-medium-8 ontario-small-10">
                  <a class="ontario-header-button ontario-header-button--without-outline ontario-header__language-toggler" href="/fr">
                    <abbr class="ontario-show-for-small-only" title="Français">
                      FR
                    </abbr>
                    <span class="ontario-show-for-medium">
                      Français
                    </span>
                  </a>
                  <div class="ontario-hide-for-large">
                    <button aria-controls="ontario-search-form-container" class="ontario-header-button ontario-header-button--without-outline ontario-header__search-toggler" id="ontario-header-search-toggler">
                      <div class="ontario-icon-container"></div>
                      <span class="ontario-show ontario-show-for-medium">
                        Search
                      </span>
                    </button>
                  </div>
                  <button aria-hidden="false" aria-label="close menu" class="ontario-application-navigation--closed ontario-header-button ontario-header-button--with-outline ontario-header__menu-toggler" id="ontario-application-header-menu-toggler">
                    <div class="ontario-icon-container"></div>
                    <span>
                      Menu
                    </span>
                  </button>
                </div>
                <div class="ontario-columns ontario-header__search-close-container ontario-medium-3 ontario-small-2">
                  <button aria-label="close search bar" class="ontario-header-button ontario-header-button--without-outline ontario-header__search-close" id="ontario-header-search-close">
                    <span aria-hidden="false">
                      close
                    </span>
                    <div class="ontario-icon-container"></div>
                  </button>
                </div>
              </div>
            </header>
            <nav aria-hidden="false" class="ontario-navigation" id="ontario-navigation" role="navigation">
              <div class="ontario-navigation ontario-navigation--closed ontario-navigation__container">
                <ul>
                  <li>
                    <a href="/ontario-hint" tabindex="-1">
                      Health
                    </a>
                  </li>
                  <li>
                    <a href="/ontario-hint" tabindex="-1">
                      Financial
                    </a>
                  </li>
                  <li>
                    <a href="/ontario-hint" tabindex="-1">
                      Financial
                    </a>
                  </li>
                  <li>
                    <a href="/ontario-hint" tabindex="-1">
                      Financial
                    </a>
                  </li>
                  <li>
                    <a href="/ontario-hint" tabindex="-1">
                      Financial
                    </a>
                  </li>
                  <li>
                    <a href="/ontario-hint" tabindex="-1">
                      Financial
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </mock:shadow-root>
    </ontario-header>
  `);
	});
});
