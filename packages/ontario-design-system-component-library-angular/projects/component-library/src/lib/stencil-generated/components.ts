/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import { Components } from '@ongov/ontario-design-system-component-library';


@ProxyCmp({
  inputs: ['accordionData', 'expandCollapseButton', 'language', 'name']
})
@Component({
  selector: 'ontario-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['accordionData', 'expandCollapseButton', 'language', 'name'],
  outputs: ['accordionChange'],
  standalone: false
})
export class OntarioAccordion {
  protected el: HTMLOntarioAccordionElement;
  @Output() accordionChange = new EventEmitter<CustomEvent<IOntarioAccordionAccordionChangeDetail>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AccordionChangeDetail as IOntarioAccordionAccordionChangeDetail } from '@ongov/ontario-design-system-component-library';

export declare interface OntarioAccordion extends Components.OntarioAccordion {
  /**
   * Emits when open indexes change
   */
  accordionChange: EventEmitter<CustomEvent<IOntarioAccordionAccordionChangeDetail>>;
}


@ProxyCmp({
  inputs: ['content', 'headingContent', 'headingContentType', 'headingType', 'highlightColour']
})
@Component({
  selector: 'ontario-aside',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['content', 'headingContent', 'headingContentType', 'headingType', 'highlightColour'],
  standalone: false
})
export class OntarioAside {
  protected el: HTMLOntarioAsideElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioAside extends Components.OntarioAside {}


@ProxyCmp({
  inputs: ['language']
})
@Component({
  selector: 'ontario-back-to-top',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['language'],
  standalone: false
})
export class OntarioBackToTop {
  protected el: HTMLOntarioBackToTopElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioBackToTop extends Components.OntarioBackToTop {}


@ProxyCmp({
  inputs: ['ariaLabelText', 'colour', 'label']
})
@Component({
  selector: 'ontario-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabelText', 'colour', 'label'],
  standalone: false
})
export class OntarioBadge {
  protected el: HTMLOntarioBadgeElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioBadge extends Components.OntarioBadge {}


@ProxyCmp({
  inputs: ['attribution', 'byline', 'quote']
})
@Component({
  selector: 'ontario-blockquote',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['attribution', 'byline', 'quote'],
  standalone: false
})
export class OntarioBlockquote {
  protected el: HTMLOntarioBlockquoteElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioBlockquote extends Components.OntarioBlockquote {}


@ProxyCmp({
  inputs: ['ariaLabelText', 'elementId', 'htmlType', 'label', 'type']
})
@Component({
  selector: 'ontario-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabelText', 'elementId', 'htmlType', 'label', 'type'],
  standalone: false
})
export class OntarioButton {
  protected el: HTMLOntarioButtonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioButton extends Components.OntarioButton {}


@ProxyCmp({
  inputs: ['content', 'headingContent', 'headingContentType', 'headingType', 'highlightColour']
})
@Component({
  selector: 'ontario-callout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['content', 'headingContent', 'headingContentType', 'headingType', 'highlightColour'],
  standalone: false
})
export class OntarioCallout {
  protected el: HTMLOntarioCalloutElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioCallout extends Components.OntarioCallout {}


@ProxyCmp({
  inputs: ['ariaLabelText', 'cardLink', 'description', 'headerColour', 'headingLevel', 'horizontalImagePositionType', 'horizontalImageSizeType', 'image', 'imageAltText', 'label', 'layoutDirection']
})
@Component({
  selector: 'ontario-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabelText', 'cardLink', 'description', 'headerColour', 'headingLevel', 'horizontalImagePositionType', 'horizontalImageSizeType', 'image', 'imageAltText', 'label', 'layoutDirection'],
  standalone: false
})
export class OntarioCard {
  protected el: HTMLOntarioCardElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioCard extends Components.OntarioCard {}


@ProxyCmp({
  inputs: ['cardsPerRow']
})
@Component({
  selector: 'ontario-card-collection',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['cardsPerRow'],
  standalone: false
})
export class OntarioCardCollection {
  protected el: HTMLOntarioCardCollectionElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioCardCollection extends Components.OntarioCardCollection {}


@ProxyCmp({
  inputs: ['caption', 'customOnBlur', 'customOnChange', 'customOnFocus', 'errorMessage', 'hintExpander', 'hintText', 'language', 'name', 'options', 'required']
})
@Component({
  selector: 'ontario-checkboxes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['caption', 'customOnBlur', 'customOnChange', 'customOnFocus', 'errorMessage', 'hintExpander', 'hintText', 'language', 'name', 'options', 'required'],
  outputs: ['checkboxOnChange', 'checkboxOnBlur', 'checkboxOnFocus', 'inputErrorOccurred'],
  standalone: false
})
export class OntarioCheckboxes {
  protected el: HTMLOntarioCheckboxesElement;
  @Output() checkboxOnChange = new EventEmitter<CustomEvent<IOntarioCheckboxesRadioAndCheckboxChangeEvent>>();
  @Output() checkboxOnBlur = new EventEmitter<CustomEvent<IOntarioCheckboxesInputFocusBlurEvent>>();
  @Output() checkboxOnFocus = new EventEmitter<CustomEvent<IOntarioCheckboxesInputFocusBlurEvent>>();
  @Output() inputErrorOccurred = new EventEmitter<CustomEvent<{ errorMessage: string }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { RadioAndCheckboxChangeEvent as IOntarioCheckboxesRadioAndCheckboxChangeEvent } from '@ongov/ontario-design-system-component-library';
import type { InputFocusBlurEvent as IOntarioCheckboxesInputFocusBlurEvent } from '@ongov/ontario-design-system-component-library';

export declare interface OntarioCheckboxes extends Components.OntarioCheckboxes {
  /**
   * Emitted when a keyboard input or mouse event occurs when a checkbox option has been changed.
   */
  checkboxOnChange: EventEmitter<CustomEvent<IOntarioCheckboxesRadioAndCheckboxChangeEvent>>;
  /**
   * Emitted when a keyboard input event occurs when a checkbox option has lost focus.
   */
  checkboxOnBlur: EventEmitter<CustomEvent<IOntarioCheckboxesInputFocusBlurEvent>>;
  /**
   * Emitted when a keyboard input event occurs when a checkbox option has gained focus.
   */
  checkboxOnFocus: EventEmitter<CustomEvent<IOntarioCheckboxesInputFocusBlurEvent>>;
  /**
   * Emitted when an error message is reported to the component.
   */
  inputErrorOccurred: EventEmitter<CustomEvent<{ errorMessage: string }>>;
}


@ProxyCmp({
  inputs: ['content']
})
@Component({
  selector: 'ontario-critical-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['content'],
  standalone: false
})
export class OntarioCriticalAlert {
  protected el: HTMLOntarioCriticalAlertElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioCriticalAlert extends Components.OntarioCriticalAlert {}


@ProxyCmp({
  inputs: ['caption', 'dateOptions', 'dateValidator', 'elementId', 'hintText', 'language', 'maxYear', 'minYear', 'placeholder', 'required']
})
@Component({
  selector: 'ontario-date-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['caption', 'dateOptions', 'dateValidator', 'elementId', 'hintText', 'language', 'maxYear', 'minYear', 'placeholder', 'required'],
  outputs: ['inputOnInput', 'inputOnChange', 'inputOnBlur', 'inputOnFocus', 'inputErrorOccurred'],
  standalone: false
})
export class OntarioDateInput {
  protected el: HTMLOntarioDateInputElement;
  @Output() inputOnInput = new EventEmitter<CustomEvent<{ value: string; fieldType: 'day' | 'month' | 'year'; }>>();
  @Output() inputOnChange = new EventEmitter<CustomEvent<{ value: string; fieldType: 'day' | 'month' | 'year'; }>>();
  @Output() inputOnBlur = new EventEmitter<CustomEvent<IOntarioDateInputDateInputFieldType>>();
  @Output() inputOnFocus = new EventEmitter<CustomEvent<IOntarioDateInputDateInputFieldType>>();
  @Output() inputErrorOccurred = new EventEmitter<CustomEvent<{ inputId: string; errorMessage: string }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { DateInputFieldType as IOntarioDateInputDateInputFieldType } from '@ongov/ontario-design-system-component-library';

export declare interface OntarioDateInput extends Components.OntarioDateInput {
  /**
   * Emitted when an `input` event occurs within the component.
   */
  inputOnInput: EventEmitter<CustomEvent<{ value: string; fieldType: 'day' | 'month' | 'year'; }>>;
  /**
   * Emitted when a `change` event occurs within the component.
   */
  inputOnChange: EventEmitter<CustomEvent<{ value: string; fieldType: 'day' | 'month' | 'year'; }>>;
  /**
   * Emitted when a keyboard input event occurs when an input has lost focus.
   */
  inputOnBlur: EventEmitter<CustomEvent<IOntarioDateInputDateInputFieldType>>;
  /**
   * Emitted when a keyboard input event occurs when an input has gained focus.
   */
  inputOnFocus: EventEmitter<CustomEvent<IOntarioDateInputDateInputFieldType>>;
  /**
   * Emitted when an error message is reported to the component.
   */
  inputErrorOccurred: EventEmitter<CustomEvent<{ inputId: string; errorMessage: string }>>;
}


@ProxyCmp({
  inputs: ['caption', 'customOnBlur', 'customOnChange', 'customOnFocus', 'elementId', 'errorMessage', 'hintExpander', 'hintText', 'isEmptyStartOption', 'language', 'name', 'options', 'required']
})
@Component({
  selector: 'ontario-dropdown-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['caption', 'customOnBlur', 'customOnChange', 'customOnFocus', 'elementId', 'errorMessage', 'hintExpander', 'hintText', 'isEmptyStartOption', 'language', 'name', 'options', 'required'],
  outputs: ['dropdownOnChange', 'dropdownOnBlur', 'dropdownOnFocus', 'inputErrorOccurred'],
  standalone: false
})
export class OntarioDropdownList {
  protected el: HTMLOntarioDropdownListElement;
  @Output() dropdownOnChange = new EventEmitter<CustomEvent<IOntarioDropdownListInputInteractionEvent>>();
  @Output() dropdownOnBlur = new EventEmitter<CustomEvent<IOntarioDropdownListInputFocusBlurEvent>>();
  @Output() dropdownOnFocus = new EventEmitter<CustomEvent<IOntarioDropdownListInputFocusBlurEvent>>();
  @Output() inputErrorOccurred = new EventEmitter<CustomEvent<{ errorMessage: string }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { InputInteractionEvent as IOntarioDropdownListInputInteractionEvent } from '@ongov/ontario-design-system-component-library';
import type { InputFocusBlurEvent as IOntarioDropdownListInputFocusBlurEvent } from '@ongov/ontario-design-system-component-library';

export declare interface OntarioDropdownList extends Components.OntarioDropdownList {
  /**
   * Emitted when a keyboard input or mouse event occurs when a dropdown list has been changed.
   */
  dropdownOnChange: EventEmitter<CustomEvent<IOntarioDropdownListInputInteractionEvent>>;
  /**
   * Emitted when a keyboard input event occurs when a dropdown list has lost focus.
   */
  dropdownOnBlur: EventEmitter<CustomEvent<IOntarioDropdownListInputFocusBlurEvent>>;
  /**
   * Emitted when a keyboard input event occurs when a dropdown list has gained focus.
   */
  dropdownOnFocus: EventEmitter<CustomEvent<IOntarioDropdownListInputFocusBlurEvent>>;
  /**
   * Emitted when an error message is reported to the component.
   */
  inputErrorOccurred: EventEmitter<CustomEvent<{ errorMessage: string }>>;
}


@ProxyCmp({
  inputs: ['legend', 'legendSize']
})
@Component({
  selector: 'ontario-fieldset',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['legend', 'legendSize'],
  standalone: false
})
export class OntarioFieldset {
  protected el: HTMLOntarioFieldsetElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioFieldset extends Components.OntarioFieldset {}


@ProxyCmp({
  inputs: ['assetBasePath', 'footerLinks', 'language', 'socialLinks', 'threeColumnOptions', 'topMargin', 'twoColumnOptions', 'type']
})
@Component({
  selector: 'ontario-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['assetBasePath', 'footerLinks', 'language', 'socialLinks', 'threeColumnOptions', 'topMargin', 'twoColumnOptions', 'type'],
  standalone: false
})
export class OntarioFooter {
  protected el: HTMLOntarioFooterElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioFooter extends Components.OntarioFooter {}


@ProxyCmp({
  inputs: ['gap']
})
@Component({
  selector: 'ontario-form-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['gap'],
  standalone: false
})
export class OntarioFormContainer {
  protected el: HTMLOntarioFormContainerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioFormContainer extends Components.OntarioFormContainer {}


@ProxyCmp({
  inputs: ['applicationHeaderInfo', 'assetBasePath', 'customLanguageToggle', 'customSignInToggle', 'disableDynamicMenu', 'language', 'languageToggleOptions', 'menuItems', 'signInMenuItems', 'type']
})
@Component({
  selector: 'ontario-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['applicationHeaderInfo', 'assetBasePath', 'customLanguageToggle', 'customSignInToggle', 'disableDynamicMenu', 'language', 'languageToggleOptions', 'menuItems', 'signInMenuItems', 'type'],
  outputs: ['menuButtonToggled'],
  standalone: false
})
export class OntarioHeader {
  protected el: HTMLOntarioHeaderElement;
  @Output() menuButtonToggled = new EventEmitter<CustomEvent<boolean>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioHeader extends Components.OntarioHeader {
  /**
   * This event is toggled when the menu button is pressed.
The `<ontario-header-overflow-menu>` sub-component listens for this event
To trigger the showing and hiding of the overflow menu.
   */
  menuButtonToggled: EventEmitter<CustomEvent<boolean>>;
}


@ProxyCmp({
  inputs: ['autoDetectMode', 'language', 'signInMenuItems', 'topicsMenuItems']
})
@Component({
  selector: 'ontario-header-menu-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoDetectMode', 'language', 'signInMenuItems', 'topicsMenuItems'],
  outputs: ['takeOwnership', 'focusFirstItem', 'focusMenuButton'],
  standalone: false
})
export class OntarioHeaderMenuTabs {
  protected el: HTMLOntarioHeaderMenuTabsElement;
  @Output() takeOwnership = new EventEmitter<CustomEvent<{ panelId: string | null }>>();
  @Output() focusFirstItem = new EventEmitter<CustomEvent<void>>();
  @Output() focusMenuButton = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioHeaderMenuTabs extends Components.OntarioHeaderMenuTabs {
  /**
   * Event emitted when ownership handoff is triggered in auto-detect mode.
   */
  takeOwnership: EventEmitter<CustomEvent<{ panelId: string | null }>>;
  /**
   * Event emitted to request overflow menu to focus its first item.
   */
  focusFirstItem: EventEmitter<CustomEvent<void>>;
  /**
   * Event emitted to request header to focus the menu button.
Triggered when Shift+Tab is pressed on the first tab.
   */
  focusMenuButton: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['isLastMenu', 'language', 'menuItems']
})
@Component({
  selector: 'ontario-header-overflow-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['isLastMenu', 'language', 'menuItems'],
  outputs: ['menuClosed', 'endOfMenuReached', 'focusMenuButton', 'focusNextElement', 'menuButtonTabPressed'],
  standalone: false
})
export class OntarioHeaderOverflowMenu {
  protected el: HTMLOntarioHeaderOverflowMenuElement;
  @Output() menuClosed = new EventEmitter<CustomEvent<void>>();
  @Output() endOfMenuReached = new EventEmitter<CustomEvent<void>>();
  @Output() focusMenuButton = new EventEmitter<CustomEvent<void>>();
  @Output() focusNextElement = new EventEmitter<CustomEvent<void>>();
  @Output() menuButtonTabPressed = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioHeaderOverflowMenu extends Components.OntarioHeaderOverflowMenu {
  /**
   * Event emitted when menu closes (standalone mode).
   */
  menuClosed: EventEmitter<CustomEvent<void>>;
  /**
   * Event emitted when Tab is pressed on the last menu item (embedded mode).
   */
  endOfMenuReached: EventEmitter<CustomEvent<void>>;
  /**
   * Event emitted when Shift+Tab is pressed on first menu item.
Tells the header to focus the menu button.
   */
  focusMenuButton: EventEmitter<CustomEvent<void>>;
  /**
   * Event emitted when Tab is pressed on the last menu item in standalone mode.
Tells the header to focus the next appropriate element.
   */
  focusNextElement: EventEmitter<CustomEvent<void>>;
  /**
   * Event emitted when user Tabs from the menu button.
Asks if menu is open and ready to receive focus.
   */
  menuButtonTabPressed: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['content', 'elementId', 'hint', 'hintContentType']
})
@Component({
  selector: 'ontario-hint-expander',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['content', 'elementId', 'hint', 'hintContentType'],
  outputs: ['toggleExpanderEvent'],
  standalone: false
})
export class OntarioHintExpander {
  protected el: HTMLOntarioHintExpanderElement;
  @Output() toggleExpanderEvent = new EventEmitter<CustomEvent<MouseEvent | KeyboardEvent>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioHintExpander extends Components.OntarioHintExpander {
  /**
   * Emitted when a keyboard input or mouse event occurs.
   */
  toggleExpanderEvent: EventEmitter<CustomEvent<MouseEvent | KeyboardEvent>>;
}


@ProxyCmp({
  inputs: ['elementId', 'hint', 'hintContentType'],
  methods: ['getHintTextId']
})
@Component({
  selector: 'ontario-hint-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['elementId', 'hint', 'hintContentType'],
  standalone: false
})
export class OntarioHintText {
  protected el: HTMLOntarioHintTextElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioHintText extends Components.OntarioHintText {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-accessibility',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconAccessibility {
  protected el: HTMLOntarioIconAccessibilityElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconAccessibility extends Components.OntarioIconAccessibility {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-account',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconAccount {
  protected el: HTMLOntarioIconAccountElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconAccount extends Components.OntarioIconAccount {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-add',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconAdd {
  protected el: HTMLOntarioIconAddElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconAdd extends Components.OntarioIconAdd {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-add-alt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconAddAlt {
  protected el: HTMLOntarioIconAddAltElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconAddAlt extends Components.OntarioIconAddAlt {}


@ProxyCmp({
  inputs: ['iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-alert-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconWidth', 'isDecorative'],
})
export class OntarioIconAlertError {
  protected el: HTMLOntarioIconAlertErrorElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconAlertError extends Components.OntarioIconAlertError {}


@ProxyCmp({
  inputs: ['iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-alert-information',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconWidth', 'isDecorative'],
})
export class OntarioIconAlertInformation {
  protected el: HTMLOntarioIconAlertInformationElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconAlertInformation extends Components.OntarioIconAlertInformation {}


@ProxyCmp({
  inputs: ['iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-alert-success',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconWidth', 'isDecorative'],
})
export class OntarioIconAlertSuccess {
  protected el: HTMLOntarioIconAlertSuccessElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconAlertSuccess extends Components.OntarioIconAlertSuccess {}


@ProxyCmp({
  inputs: ['iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-alert-warning',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconWidth', 'isDecorative'],
})
export class OntarioIconAlertWarning {
  protected el: HTMLOntarioIconAlertWarningElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconAlertWarning extends Components.OntarioIconAlertWarning {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-arrow-up',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconArrowUp {
  protected el: HTMLOntarioIconArrowUpElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconArrowUp extends Components.OntarioIconArrowUp {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-attach',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconAttach {
  protected el: HTMLOntarioIconAttachElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconAttach extends Components.OntarioIconAttach {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-bookmark-off',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconBookmarkOff {
  protected el: HTMLOntarioIconBookmarkOffElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconBookmarkOff extends Components.OntarioIconBookmarkOff {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-bookmark-on',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconBookmarkOn {
  protected el: HTMLOntarioIconBookmarkOnElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconBookmarkOn extends Components.OntarioIconBookmarkOn {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconCalendar {
  protected el: HTMLOntarioIconCalendarElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconCalendar extends Components.OntarioIconCalendar {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-camera',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconCamera {
  protected el: HTMLOntarioIconCameraElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconCamera extends Components.OntarioIconCamera {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-chevron-down',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconChevronDown {
  protected el: HTMLOntarioIconChevronDownElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconChevronDown extends Components.OntarioIconChevronDown {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-chevron-left',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconChevronLeft {
  protected el: HTMLOntarioIconChevronLeftElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconChevronLeft extends Components.OntarioIconChevronLeft {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-chevron-right',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconChevronRight {
  protected el: HTMLOntarioIconChevronRightElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconChevronRight extends Components.OntarioIconChevronRight {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-chevron-up',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconChevronUp {
  protected el: HTMLOntarioIconChevronUpElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconChevronUp extends Components.OntarioIconChevronUp {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-clock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconClock {
  protected el: HTMLOntarioIconClockElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconClock extends Components.OntarioIconClock {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-close',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconClose {
  protected el: HTMLOntarioIconCloseElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconClose extends Components.OntarioIconClose {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-close-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconCloseHeader {
  protected el: HTMLOntarioIconCloseHeaderElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconCloseHeader extends Components.OntarioIconCloseHeader {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-cloud',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconCloud {
  protected el: HTMLOntarioIconCloudElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconCloud extends Components.OntarioIconCloud {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-collapse',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconCollapse {
  protected el: HTMLOntarioIconCollapseElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconCollapse extends Components.OntarioIconCollapse {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-credit-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconCreditCard {
  protected el: HTMLOntarioIconCreditCardElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconCreditCard extends Components.OntarioIconCreditCard {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-critical-alert-warning',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconCriticalAlertWarning {
  protected el: HTMLOntarioIconCriticalAlertWarningElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconCriticalAlertWarning extends Components.OntarioIconCriticalAlertWarning {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-delete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconDelete {
  protected el: HTMLOntarioIconDeleteElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconDelete extends Components.OntarioIconDelete {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-document',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconDocument {
  protected el: HTMLOntarioIconDocumentElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconDocument extends Components.OntarioIconDocument {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-download',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconDownload {
  protected el: HTMLOntarioIconDownloadElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconDownload extends Components.OntarioIconDownload {}


@ProxyCmp({
  inputs: ['iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-dropdown-arrow',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconWidth', 'isDecorative'],
})
export class OntarioIconDropdownArrow {
  protected el: HTMLOntarioIconDropdownArrowElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconDropdownArrow extends Components.OntarioIconDropdownArrow {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconEdit {
  protected el: HTMLOntarioIconEditElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconEdit extends Components.OntarioIconEdit {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-email',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconEmail {
  protected el: HTMLOntarioIconEmailElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconEmail extends Components.OntarioIconEmail {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-expand',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconExpand {
  protected el: HTMLOntarioIconExpandElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconExpand extends Components.OntarioIconExpand {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-export',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconExport {
  protected el: HTMLOntarioIconExportElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconExport extends Components.OntarioIconExport {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-facebook',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconFacebook {
  protected el: HTMLOntarioIconFacebookElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconFacebook extends Components.OntarioIconFacebook {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-facebook-alt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconFacebookAlt {
  protected el: HTMLOntarioIconFacebookAltElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconFacebookAlt extends Components.OntarioIconFacebookAlt {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-favourite-off',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconFavouriteOff {
  protected el: HTMLOntarioIconFavouriteOffElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconFavouriteOff extends Components.OntarioIconFavouriteOff {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-favourite-on',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconFavouriteOn {
  protected el: HTMLOntarioIconFavouriteOnElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconFavouriteOn extends Components.OntarioIconFavouriteOn {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconFilter {
  protected el: HTMLOntarioIconFilterElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconFilter extends Components.OntarioIconFilter {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-flickr',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconFlickr {
  protected el: HTMLOntarioIconFlickrElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconFlickr extends Components.OntarioIconFlickr {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconGrid {
  protected el: HTMLOntarioIconGridElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconGrid extends Components.OntarioIconGrid {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-help',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconHelp {
  protected el: HTMLOntarioIconHelpElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconHelp extends Components.OntarioIconHelp {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-instagram',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconInstagram {
  protected el: HTMLOntarioIconInstagramElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconInstagram extends Components.OntarioIconInstagram {}


@ProxyCmp({
  inputs: ['iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-interac-en',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconWidth', 'isDecorative'],
})
export class OntarioIconInteracEn {
  protected el: HTMLOntarioIconInteracEnElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconInteracEn extends Components.OntarioIconInteracEn {}


@ProxyCmp({
  inputs: ['iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-interac-en-alt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconWidth', 'isDecorative'],
})
export class OntarioIconInteracEnAlt {
  protected el: HTMLOntarioIconInteracEnAltElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconInteracEnAlt extends Components.OntarioIconInteracEnAlt {}


@ProxyCmp({
  inputs: ['iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-interac-fr',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconWidth', 'isDecorative'],
})
export class OntarioIconInteracFr {
  protected el: HTMLOntarioIconInteracFrElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconInteracFr extends Components.OntarioIconInteracFr {}


@ProxyCmp({
  inputs: ['iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-interac-fr-alt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconWidth', 'isDecorative'],
})
export class OntarioIconInteracFrAlt {
  protected el: HTMLOntarioIconInteracFrAltElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconInteracFrAlt extends Components.OntarioIconInteracFrAlt {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-linkedin',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconLinkedin {
  protected el: HTMLOntarioIconLinkedinElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconLinkedin extends Components.OntarioIconLinkedin {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-linkedin-alt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconLinkedinAlt {
  protected el: HTMLOntarioIconLinkedinAltElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconLinkedinAlt extends Components.OntarioIconLinkedinAlt {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconList {
  protected el: HTMLOntarioIconListElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconList extends Components.OntarioIconList {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-live-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconLiveChat {
  protected el: HTMLOntarioIconLiveChatElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconLiveChat extends Components.OntarioIconLiveChat {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-location-off',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconLocationOff {
  protected el: HTMLOntarioIconLocationOffElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconLocationOff extends Components.OntarioIconLocationOff {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-location-on',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconLocationOn {
  protected el: HTMLOntarioIconLocationOnElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconLocationOn extends Components.OntarioIconLocationOn {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-lock-off',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconLockOff {
  protected el: HTMLOntarioIconLockOffElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconLockOff extends Components.OntarioIconLockOff {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-lock-on',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconLockOn {
  protected el: HTMLOntarioIconLockOnElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconLockOn extends Components.OntarioIconLockOn {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconMap {
  protected el: HTMLOntarioIconMapElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconMap extends Components.OntarioIconMap {}


@ProxyCmp({
  inputs: ['iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-mastercard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconWidth', 'isDecorative'],
})
export class OntarioIconMastercard {
  protected el: HTMLOntarioIconMastercardElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconMastercard extends Components.OntarioIconMastercard {}


@ProxyCmp({
  inputs: ['iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-mastercard-alt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconWidth', 'isDecorative'],
})
export class OntarioIconMastercardAlt {
  protected el: HTMLOntarioIconMastercardAltElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconMastercardAlt extends Components.OntarioIconMastercardAlt {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-media-fast-forward',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconMediaFastForward {
  protected el: HTMLOntarioIconMediaFastForwardElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconMediaFastForward extends Components.OntarioIconMediaFastForward {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-media-fast-rewind',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconMediaFastRewind {
  protected el: HTMLOntarioIconMediaFastRewindElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconMediaFastRewind extends Components.OntarioIconMediaFastRewind {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-media-pause',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconMediaPause {
  protected el: HTMLOntarioIconMediaPauseElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconMediaPause extends Components.OntarioIconMediaPause {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-media-play',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconMediaPlay {
  protected el: HTMLOntarioIconMediaPlayElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconMediaPlay extends Components.OntarioIconMediaPlay {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-media-stop',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconMediaStop {
  protected el: HTMLOntarioIconMediaStopElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconMediaStop extends Components.OntarioIconMediaStop {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconMenu {
  protected el: HTMLOntarioIconMenuElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconMenu extends Components.OntarioIconMenu {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-menu-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconMenuHeader {
  protected el: HTMLOntarioIconMenuHeaderElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconMenuHeader extends Components.OntarioIconMenuHeader {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-microphone-off',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconMicrophoneOff {
  protected el: HTMLOntarioIconMicrophoneOffElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconMicrophoneOff extends Components.OntarioIconMicrophoneOff {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-microphone-on',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconMicrophoneOn {
  protected el: HTMLOntarioIconMicrophoneOnElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconMicrophoneOn extends Components.OntarioIconMicrophoneOn {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-more-accounts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconMoreAccounts {
  protected el: HTMLOntarioIconMoreAccountsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconMoreAccounts extends Components.OntarioIconMoreAccounts {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-more-vertical',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconMoreVertical {
  protected el: HTMLOntarioIconMoreVerticalElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconMoreVertical extends Components.OntarioIconMoreVertical {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-new-window',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconNewWindow {
  protected el: HTMLOntarioIconNewWindowElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconNewWindow extends Components.OntarioIconNewWindow {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-next',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconNext {
  protected el: HTMLOntarioIconNextElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconNext extends Components.OntarioIconNext {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-notification',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconNotification {
  protected el: HTMLOntarioIconNotificationElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconNotification extends Components.OntarioIconNotification {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-password-hide',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconPasswordHide {
  protected el: HTMLOntarioIconPasswordHideElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconPasswordHide extends Components.OntarioIconPasswordHide {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-password-show',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconPasswordShow {
  protected el: HTMLOntarioIconPasswordShowElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconPasswordShow extends Components.OntarioIconPasswordShow {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-phone',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconPhone {
  protected el: HTMLOntarioIconPhoneElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconPhone extends Components.OntarioIconPhone {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-photo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconPhoto {
  protected el: HTMLOntarioIconPhotoElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconPhoto extends Components.OntarioIconPhoto {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-pin-location-off',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconPinLocationOff {
  protected el: HTMLOntarioIconPinLocationOffElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconPinLocationOff extends Components.OntarioIconPinLocationOff {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-pin-location-on',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconPinLocationOn {
  protected el: HTMLOntarioIconPinLocationOnElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconPinLocationOn extends Components.OntarioIconPinLocationOn {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-previous',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconPrevious {
  protected el: HTMLOntarioIconPreviousElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconPrevious extends Components.OntarioIconPrevious {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-print',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconPrint {
  protected el: HTMLOntarioIconPrintElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconPrint extends Components.OntarioIconPrint {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-remove',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconRemove {
  protected el: HTMLOntarioIconRemoveElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconRemove extends Components.OntarioIconRemove {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-remove-alt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconRemoveAlt {
  protected el: HTMLOntarioIconRemoveAltElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconRemoveAlt extends Components.OntarioIconRemoveAlt {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-replay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconReplay {
  protected el: HTMLOntarioIconReplayElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconReplay extends Components.OntarioIconReplay {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-rss-feed',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconRssFeed {
  protected el: HTMLOntarioIconRssFeedElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconRssFeed extends Components.OntarioIconRssFeed {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-save',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconSave {
  protected el: HTMLOntarioIconSaveElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconSave extends Components.OntarioIconSave {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconSearch {
  protected el: HTMLOntarioIconSearchElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconSearch extends Components.OntarioIconSearch {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-search-white',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconSearchWhite {
  protected el: HTMLOntarioIconSearchWhiteElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconSearchWhite extends Components.OntarioIconSearchWhite {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-sentiment-1',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconSentiment1 {
  protected el: HTMLOntarioIconSentiment1Element;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconSentiment1 extends Components.OntarioIconSentiment1 {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-sentiment-2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconSentiment2 {
  protected el: HTMLOntarioIconSentiment2Element;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconSentiment2 extends Components.OntarioIconSentiment2 {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-sentiment-3',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconSentiment3 {
  protected el: HTMLOntarioIconSentiment3Element;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconSentiment3 extends Components.OntarioIconSentiment3 {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-sentiment-4',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconSentiment4 {
  protected el: HTMLOntarioIconSentiment4Element;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconSentiment4 extends Components.OntarioIconSentiment4 {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-sentiment-5',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconSentiment5 {
  protected el: HTMLOntarioIconSentiment5Element;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconSentiment5 extends Components.OntarioIconSentiment5 {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconSettings {
  protected el: HTMLOntarioIconSettingsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconSettings extends Components.OntarioIconSettings {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-share',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconShare {
  protected el: HTMLOntarioIconShareElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconShare extends Components.OntarioIconShare {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-sort',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconSort {
  protected el: HTMLOntarioIconSortElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconSort extends Components.OntarioIconSort {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-sort-alphabetical-ascending',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconSortAlphabeticalAscending {
  protected el: HTMLOntarioIconSortAlphabeticalAscendingElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconSortAlphabeticalAscending extends Components.OntarioIconSortAlphabeticalAscending {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-sort-alphabetical-descending',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconSortAlphabeticalDescending {
  protected el: HTMLOntarioIconSortAlphabeticalDescendingElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconSortAlphabeticalDescending extends Components.OntarioIconSortAlphabeticalDescending {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-sort-ascending',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconSortAscending {
  protected el: HTMLOntarioIconSortAscendingElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconSortAscending extends Components.OntarioIconSortAscending {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-sort-descending',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconSortDescending {
  protected el: HTMLOntarioIconSortDescendingElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconSortDescending extends Components.OntarioIconSortDescending {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-sort-variant',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconSortVariant {
  protected el: HTMLOntarioIconSortVariantElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconSortVariant extends Components.OntarioIconSortVariant {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconTag {
  protected el: HTMLOntarioIconTagElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconTag extends Components.OntarioIconTag {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-text-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconTextMessage {
  protected el: HTMLOntarioIconTextMessageElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconTextMessage extends Components.OntarioIconTextMessage {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-timer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconTimer {
  protected el: HTMLOntarioIconTimerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconTimer extends Components.OntarioIconTimer {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-transport-bicycle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconTransportBicycle {
  protected el: HTMLOntarioIconTransportBicycleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconTransportBicycle extends Components.OntarioIconTransportBicycle {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-transport-bus',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconTransportBus {
  protected el: HTMLOntarioIconTransportBusElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconTransportBus extends Components.OntarioIconTransportBus {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-transport-car',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconTransportCar {
  protected el: HTMLOntarioIconTransportCarElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconTransportCar extends Components.OntarioIconTransportCar {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-transport-walk',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconTransportWalk {
  protected el: HTMLOntarioIconTransportWalkElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconTransportWalk extends Components.OntarioIconTransportWalk {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-tty',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconTty {
  protected el: HTMLOntarioIconTtyElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconTty extends Components.OntarioIconTty {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-tune',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconTune {
  protected el: HTMLOntarioIconTuneElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconTune extends Components.OntarioIconTune {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-twitter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconTwitter {
  protected el: HTMLOntarioIconTwitterElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconTwitter extends Components.OntarioIconTwitter {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-twitter-alt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconTwitterAlt {
  protected el: HTMLOntarioIconTwitterAltElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconTwitterAlt extends Components.OntarioIconTwitterAlt {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-upload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconUpload {
  protected el: HTMLOntarioIconUploadElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconUpload extends Components.OntarioIconUpload {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-video',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconVideo {
  protected el: HTMLOntarioIconVideoElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconVideo extends Components.OntarioIconVideo {}


@ProxyCmp({
  inputs: ['iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-visa',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['iconWidth', 'isDecorative'],
})
export class OntarioIconVisa {
  protected el: HTMLOntarioIconVisaElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconVisa extends Components.OntarioIconVisa {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-vote-dislike',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconVoteDislike {
  protected el: HTMLOntarioIconVoteDislikeElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconVoteDislike extends Components.OntarioIconVoteDislike {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-vote-like',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconVoteLike {
  protected el: HTMLOntarioIconVoteLikeElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconVoteLike extends Components.OntarioIconVoteLike {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-vpn-key',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconVpnKey {
  protected el: HTMLOntarioIconVpnKeyElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconVpnKey extends Components.OntarioIconVpnKey {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-wheelchair',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconWheelchair {
  protected el: HTMLOntarioIconWheelchairElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconWheelchair extends Components.OntarioIconWheelchair {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-wifi',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconWifi {
  protected el: HTMLOntarioIconWifiElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconWifi extends Components.OntarioIconWifi {}


@ProxyCmp({
  inputs: ['colour', 'iconWidth', 'isDecorative']
})
@Component({
  selector: 'ontario-icon-youtube',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colour', 'iconWidth', 'isDecorative'],
})
export class OntarioIconYoutube {
  protected el: HTMLOntarioIconYoutubeElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioIconYoutube extends Components.OntarioIconYoutube {}


@ProxyCmp({
  inputs: ['caption', 'customOnBlur', 'customOnChange', 'customOnFocus', 'customOnInput', 'elementId', 'enableLiveValidation', 'errorMessage', 'hintExpander', 'hintText', 'inputValidator', 'inputWidth', 'language', 'name', 'required', 'requiredValidationMessage', 'type', 'value']
})
@Component({
  selector: 'ontario-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['caption', 'customOnBlur', 'customOnChange', 'customOnFocus', 'customOnInput', 'elementId', 'enableLiveValidation', 'errorMessage', 'hintExpander', 'hintText', 'inputValidator', 'inputWidth', 'language', 'name', 'required', 'requiredValidationMessage', 'type', 'value'],
  outputs: ['inputOnInput', 'inputOnChange', 'inputOnBlur', 'inputOnFocus', 'inputErrorOccurred'],
  standalone: false
})
export class OntarioInput {
  protected el: HTMLOntarioInputElement;
  @Output() inputOnInput = new EventEmitter<CustomEvent<IOntarioInputInputInputEvent>>();
  @Output() inputOnChange = new EventEmitter<CustomEvent<IOntarioInputInputInteractionEvent>>();
  @Output() inputOnBlur = new EventEmitter<CustomEvent<IOntarioInputInputFocusBlurEvent>>();
  @Output() inputOnFocus = new EventEmitter<CustomEvent<IOntarioInputInputFocusBlurEvent>>();
  @Output() inputErrorOccurred = new EventEmitter<CustomEvent<{ inputId: string; errorMessage: string }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { InputInputEvent as IOntarioInputInputInputEvent } from '@ongov/ontario-design-system-component-library';
import type { InputInteractionEvent as IOntarioInputInputInteractionEvent } from '@ongov/ontario-design-system-component-library';
import type { InputFocusBlurEvent as IOntarioInputInputFocusBlurEvent } from '@ongov/ontario-design-system-component-library';

export declare interface OntarioInput extends Components.OntarioInput {
  /**
   * Emitted when a input  occurs when an input has been changed.
   */
  inputOnInput: EventEmitter<CustomEvent<IOntarioInputInputInputEvent>>;
  /**
   * Emitted when a keyboard input or mouse event occurs when an input has been changed.
   */
  inputOnChange: EventEmitter<CustomEvent<IOntarioInputInputInteractionEvent>>;
  /**
   * Emitted when a keyboard input event occurs when an input has lost focus.
   */
  inputOnBlur: EventEmitter<CustomEvent<IOntarioInputInputFocusBlurEvent>>;
  /**
   * Emitted when a keyboard input event occurs when an input has gained focus.
   */
  inputOnFocus: EventEmitter<CustomEvent<IOntarioInputInputFocusBlurEvent>>;
  /**
   * Emitted when an error message is reported to the component.
   */
  inputErrorOccurred: EventEmitter<CustomEvent<{ inputId: string; errorMessage: string }>>;
}


@ProxyCmp({
  inputs: ['customLanguageToggle', 'language', 'size', 'url']
})
@Component({
  selector: 'ontario-language-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['customLanguageToggle', 'language', 'size', 'url'],
  outputs: ['setAppLanguage', 'headerLanguageToggled'],
  standalone: false
})
export class OntarioLanguageToggle {
  protected el: HTMLOntarioLanguageToggleElement;
  @Output() setAppLanguage = new EventEmitter<CustomEvent<IOntarioLanguageToggleLanguage>>();
  @Output() headerLanguageToggled = new EventEmitter<CustomEvent<IOntarioLanguageToggleHeaderLanguageToggleEventDetails>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { Language as IOntarioLanguageToggleLanguage } from '@ongov/ontario-design-system-component-library';
import type { HeaderLanguageToggleEventDetails as IOntarioLanguageToggleHeaderLanguageToggleEventDetails } from '@ongov/ontario-design-system-component-library';

export declare interface OntarioLanguageToggle extends Components.OntarioLanguageToggle {
  /**
   * Event that fires during the setAppLanguageHandler() method.

The event contains the current language (after language logic has already occurred).
   */
  setAppLanguage: EventEmitter<CustomEvent<IOntarioLanguageToggleLanguage>>;
  /**
   * Event that fires when the language toggle is pressed/clicked.

The event contains the oldLanguage along with the newLanguage.
   */
  headerLanguageToggled: EventEmitter<CustomEvent<IOntarioLanguageToggleHeaderLanguageToggleEventDetails>>;
}


@ProxyCmp({
  inputs: ['fullScreenOverlay', 'isLoading', 'language', 'message', 'type']
})
@Component({
  selector: 'ontario-loading-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['fullScreenOverlay', 'isLoading', 'language', 'message', 'type'],
  standalone: false
})
export class OntarioLoadingIndicator {
  protected el: HTMLOntarioLoadingIndicatorElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioLoadingIndicator extends Components.OntarioLoadingIndicator {}


@ProxyCmp({
  inputs: ['content', 'heading', 'type']
})
@Component({
  selector: 'ontario-page-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['content', 'heading', 'type'],
  standalone: false
})
export class OntarioPageAlert {
  protected el: HTMLOntarioPageAlertElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioPageAlert extends Components.OntarioPageAlert {}


@ProxyCmp({
  inputs: ['caption', 'customOnBlur', 'customOnChange', 'customOnFocus', 'errorMessage', 'hintExpander', 'hintText', 'language', 'name', 'options', 'required']
})
@Component({
  selector: 'ontario-radio-buttons',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['caption', 'customOnBlur', 'customOnChange', 'customOnFocus', 'errorMessage', 'hintExpander', 'hintText', 'language', 'name', 'options', 'required'],
  outputs: ['radioOnChange', 'radioOnBlur', 'radioOnFocus', 'inputErrorOccurred'],
  standalone: false
})
export class OntarioRadioButtons {
  protected el: HTMLOntarioRadioButtonsElement;
  @Output() radioOnChange = new EventEmitter<CustomEvent<IOntarioRadioButtonsRadioAndCheckboxChangeEvent>>();
  @Output() radioOnBlur = new EventEmitter<CustomEvent<IOntarioRadioButtonsInputFocusBlurEvent>>();
  @Output() radioOnFocus = new EventEmitter<CustomEvent<IOntarioRadioButtonsInputFocusBlurEvent>>();
  @Output() inputErrorOccurred = new EventEmitter<CustomEvent<{ errorMessage: string }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { RadioAndCheckboxChangeEvent as IOntarioRadioButtonsRadioAndCheckboxChangeEvent } from '@ongov/ontario-design-system-component-library';
import type { InputFocusBlurEvent as IOntarioRadioButtonsInputFocusBlurEvent } from '@ongov/ontario-design-system-component-library';

export declare interface OntarioRadioButtons extends Components.OntarioRadioButtons {
  /**
   * Emitted when a keyboard input or mouse event occurs when a radio option has been changed.
   */
  radioOnChange: EventEmitter<CustomEvent<IOntarioRadioButtonsRadioAndCheckboxChangeEvent>>;
  /**
   * Emitted when a keyboard input event occurs when a radio option has lost focus.
   */
  radioOnBlur: EventEmitter<CustomEvent<IOntarioRadioButtonsInputFocusBlurEvent>>;
  /**
   * Emitted when a keyboard input event occurs when a radio option has gained focus.
   */
  radioOnFocus: EventEmitter<CustomEvent<IOntarioRadioButtonsInputFocusBlurEvent>>;
  /**
   * Emitted when an error message is reported to the component.
   */
  inputErrorOccurred: EventEmitter<CustomEvent<{ errorMessage: string }>>;
}


@ProxyCmp({
  inputs: ['caption', 'customOnBlur', 'customOnChange', 'customOnFocus', 'customOnInput', 'elementId', 'hintText', 'language', 'performSearch', 'required', 'value']
})
@Component({
  selector: 'ontario-search-box',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['caption', 'customOnBlur', 'customOnChange', 'customOnFocus', 'customOnInput', 'elementId', 'hintText', 'language', 'performSearch', 'required', 'value'],
  outputs: ['searchOnSubmit', 'inputOnInput', 'inputOnChange', 'inputOnBlur', 'inputOnFocus'],
  standalone: false
})
export class OntarioSearchBox {
  protected el: HTMLOntarioSearchBoxElement;
  @Output() searchOnSubmit = new EventEmitter<CustomEvent<string>>();
  @Output() inputOnInput = new EventEmitter<CustomEvent<IOntarioSearchBoxInputInputEvent>>();
  @Output() inputOnChange = new EventEmitter<CustomEvent<IOntarioSearchBoxInputInteractionEvent>>();
  @Output() inputOnBlur = new EventEmitter<CustomEvent<IOntarioSearchBoxInputFocusBlurEvent>>();
  @Output() inputOnFocus = new EventEmitter<CustomEvent<IOntarioSearchBoxInputFocusBlurEvent>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { InputInputEvent as IOntarioSearchBoxInputInputEvent } from '@ongov/ontario-design-system-component-library';
import type { InputInteractionEvent as IOntarioSearchBoxInputInteractionEvent } from '@ongov/ontario-design-system-component-library';
import type { InputFocusBlurEvent as IOntarioSearchBoxInputFocusBlurEvent } from '@ongov/ontario-design-system-component-library';

export declare interface OntarioSearchBox extends Components.OntarioSearchBox {
  /**
   * Emitted when the search is submitted.
Below is an example on how to hook into the event to get the event details. @example <script>
	document.getElementById('ontario-search-box').addEventListener('searchOnSubmit', (event) => {
 		const searchValue = event.detail;
		console.log('Search submitted with value:', searchValue);
  };
	</script>
   */
  searchOnSubmit: EventEmitter<CustomEvent<string>>;
  /**
   * Emitted when a input  occurs when an input has been changed.
   */
  inputOnInput: EventEmitter<CustomEvent<IOntarioSearchBoxInputInputEvent>>;
  /**
   * Emitted when a keyboard input or mouse event occurs when an input has been changed.
   */
  inputOnChange: EventEmitter<CustomEvent<IOntarioSearchBoxInputInteractionEvent>>;
  /**
   * Emitted when a keyboard input event occurs when an input has lost focus.
   */
  inputOnBlur: EventEmitter<CustomEvent<IOntarioSearchBoxInputFocusBlurEvent>>;
  /**
   * Emitted when a keyboard input event occurs when an input has gained focus.
   */
  inputOnFocus: EventEmitter<CustomEvent<IOntarioSearchBoxInputFocusBlurEvent>>;
}


@ProxyCmp({
  inputs: ['backButtonUrl', 'currentStep', 'customOnClick', 'language', 'numberOfSteps', 'percentageComplete', 'showBackButton']
})
@Component({
  selector: 'ontario-step-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['backButtonUrl', 'currentStep', 'customOnClick', 'language', 'numberOfSteps', 'percentageComplete', 'showBackButton'],
  standalone: false
})
export class OntarioStepIndicator {
  protected el: HTMLOntarioStepIndicatorElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioStepIndicator extends Components.OntarioStepIndicator {}


@ProxyCmp({
  inputs: ['caption', 'condensed', 'fullWidth', 'tableColumns', 'tableData', 'zebraStripes']
})
@Component({
  selector: 'ontario-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['caption', 'condensed', 'fullWidth', 'tableColumns', 'tableData', 'zebraStripes'],
  standalone: false
})
export class OntarioTable {
  protected el: HTMLOntarioTableElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioTable extends Components.OntarioTable {}


@ProxyCmp({
  inputs: ['deactivateLink', 'headingLevel', 'hintText', 'label', 'language', 'link', 'taskId', 'taskStatus']
})
@Component({
  selector: 'ontario-task',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['deactivateLink', 'headingLevel', 'hintText', 'label', 'language', 'link', 'taskId', 'taskStatus'],
  standalone: false
})
export class OntarioTask {
  protected el: HTMLOntarioTaskElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioTask extends Components.OntarioTask {}


@ProxyCmp({
  inputs: ['headingLevel', 'label', 'language']
})
@Component({
  selector: 'ontario-task-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['headingLevel', 'label', 'language'],
  standalone: false
})
export class OntarioTaskList {
  protected el: HTMLOntarioTaskListElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OntarioTaskList extends Components.OntarioTaskList {}


@ProxyCmp({
  inputs: ['caption', 'customOnBlur', 'customOnChange', 'customOnFocus', 'customOnInput', 'elementId', 'errorMessage', 'hintExpander', 'hintText', 'language', 'name', 'required', 'value']
})
@Component({
  selector: 'ontario-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['caption', 'customOnBlur', 'customOnChange', 'customOnFocus', 'customOnInput', 'elementId', 'errorMessage', 'hintExpander', 'hintText', 'language', 'name', 'required', 'value'],
  outputs: ['inputOnInput', 'inputOnChange', 'inputOnBlur', 'inputOnFocus', 'inputErrorOccurred'],
  standalone: false
})
export class OntarioTextarea {
  protected el: HTMLOntarioTextareaElement;
  @Output() inputOnInput = new EventEmitter<CustomEvent<IOntarioTextareaInputInputEvent>>();
  @Output() inputOnChange = new EventEmitter<CustomEvent<IOntarioTextareaInputInteractionEvent>>();
  @Output() inputOnBlur = new EventEmitter<CustomEvent<IOntarioTextareaInputFocusBlurEvent>>();
  @Output() inputOnFocus = new EventEmitter<CustomEvent<IOntarioTextareaInputFocusBlurEvent>>();
  @Output() inputErrorOccurred = new EventEmitter<CustomEvent<{ inputId: string; errorMessage: string }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { InputInputEvent as IOntarioTextareaInputInputEvent } from '@ongov/ontario-design-system-component-library';
import type { InputInteractionEvent as IOntarioTextareaInputInteractionEvent } from '@ongov/ontario-design-system-component-library';
import type { InputFocusBlurEvent as IOntarioTextareaInputFocusBlurEvent } from '@ongov/ontario-design-system-component-library';

export declare interface OntarioTextarea extends Components.OntarioTextarea {
  /**
   * Emitted when a input event occurs when an input has been changed.
   */
  inputOnInput: EventEmitter<CustomEvent<IOntarioTextareaInputInputEvent>>;
  /**
   * Emitted when a keyboard input or mouse event occurs when an input has been changed.
   */
  inputOnChange: EventEmitter<CustomEvent<IOntarioTextareaInputInteractionEvent>>;
  /**
   * Emitted when a keyboard input event occurs when an input has lost focus.
   */
  inputOnBlur: EventEmitter<CustomEvent<IOntarioTextareaInputFocusBlurEvent>>;
  /**
   * Emitted when a keyboard input event occurs when an input has gained focus.
   */
  inputOnFocus: EventEmitter<CustomEvent<IOntarioTextareaInputFocusBlurEvent>>;
  /**
   * Emitted when an error message is reported to the component.
   */
  inputErrorOccurred: EventEmitter<CustomEvent<{ inputId: string; errorMessage: string }>>;
}


