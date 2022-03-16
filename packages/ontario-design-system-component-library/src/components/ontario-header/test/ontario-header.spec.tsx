import { newSpecPage } from '@stencil/core/testing';
import { OntarioHeader } from '../ontario-header';

describe('ontario-header', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioHeader],
			html: `<ontario-header ></ontario-header>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-header>
        <mock:shadow-root>
          <div>
           <div class="ontario-application-header__container" id="ontario-application-header">
             <div class="ontario-application-main-header-container">
               <section class="ontario-application-header">
                 <div class="ontario-row">
                   <div class="ontario-application-header__logo ontario-columns ontario-small-6">
                     <a href="https://www.ontario.ca/page/government-ontario"></a>
                   </div>
                   <div class="ontario-application-header__lang-toggle ontario-columns ontario-small-6">
                     <a class="ontario-header-button ontario-header-button--without-outline">
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
                       <a></a>
                     </p>
                     <div class="ontario-application-subheader__menu-container">
                       <div class="ontario-show-for-large">
                         <ul class="ontario-application-subheader__menu"></ul>
                       </div>
                       <div class="ontario-hide-for-large ontario-hide-for-small ontario-show-for-medium">
                         <ul class="ontario-application-subheader__menu"></ul>
                       </div>
                       <button aria-controls="ontario-application-navigation" aria-label="open menu" class="ontario-header-button ontario-header-button--with-outline ontario-header__menu-toggler" data-target="megaMenu" id="ontario-application-header-menu-toggler">
                         <div class="ontario-icon ontario-icon--white"></div>
                         <span class="ontario-application-header-menu-span ontario-hide-for-small-only">
                           Menu
                         </span>
                       </button>
                     </div>
                   </div>
                 </div>
               </section>
               <nav class="ontario-application-navigation" id="ontario-application-navigation" role="navigation">
                 <div class="nav-ul-closed ontario-application-navigation ontario-application-navigation__container">
                   <ul></ul>
                 </div>
               </nav>
             </div>
           </div>
         </div>
       </mock:shadow-root>
      </ontario-header>
    `);
	});
});
