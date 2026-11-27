import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-hint-expander-page',
	templateUrl: './ontario-hint-expander.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioHintExpanderPageComponent {
	htmlContent = `<div>
                            <p>Legal issues may include:</p>
                            <ul>
                                <li>Criminal matters</li>
                                <li>Family law issues like divorce, child custody or support</li>
                                <li>Immigration and refugee matters</li>
                                <li>Civil claims, including ones made in small claims court</li>
                                <li>Issues before a tribunal or board, including landlord/tenant issues</li>
                                <li>Social assistance review</li>
                            </ul>
                        </div>`;
}
