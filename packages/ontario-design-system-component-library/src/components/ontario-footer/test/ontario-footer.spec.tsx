import { newSpecPage } from '@stencil/core/testing';
import { OntarioFooter } from '../ontario-footer';

describe('ontario-footer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OntarioFooter],
      html: `<ontario-footer></ontario-footer>`,
    });
    expect(page.root).toEqualHtml(`
       <ontario-footer>
         <mock:shadow-root>
           <footer class="ontario-footer ontario-footer--default" style="--imagePath: url(/assets/footer-default-supergraphic-logo.svg);">
             <div class="ontario-row">
               <div class="ontario-columns ontario-small-12">
                 <ul class="ontario-footer__links-container ontario-footer__links-container--inline">
                   <li>
                     <a class="ontario-footer__link">
                       Accessibility
                     </a>
                   </li>
                   <li>
                     <a class="ontario-footer__link">
                       Privacy
                     </a>
                   </li>
                   <li>
                     <a class="ontario-footer__link">
                       Contact us
                     </a>
                   </li>
                 </ul>
                 <div class="ontario-footer__copyright">
                   <a class="ontario-footer__link">
                     © Queen’s Printer for Ontario,
                     <span class="ontario-nbsp">
                       2012–22
                     </span>
                   </a>
                 </div>
               </div>
             </div>
           </footer>
         </mock:shadow-root>
       </ontario-footer>
    `);
  });
});
