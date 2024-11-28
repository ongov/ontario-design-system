/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@ongov/ontario-design-system-component-library';

@ProxyCmp({
	inputs: ['accordionData', 'expandCollapseButton', 'isOpen', 'language', 'name'],
})
@Component({
	selector: 'ontario-accordion',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['accordionData', 'expandCollapseButton', 'isOpen', 'language', 'name'],
})
export class OntarioAccordion {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioAccordion extends Components.OntarioAccordion {}

@ProxyCmp({
	inputs: ['content', 'headingContent', 'headingContentType', 'headingType', 'highlightColour'],
})
@Component({
	selector: 'ontario-aside',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['content', 'headingContent', 'headingContentType', 'headingType', 'highlightColour'],
})
export class OntarioAside {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioAside extends Components.OntarioAside {}

@ProxyCmp({
	inputs: ['language'],
})
@Component({
	selector: 'ontario-back-to-top',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['language'],
})
export class OntarioBackToTop {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioBackToTop extends Components.OntarioBackToTop {}

@ProxyCmp({
	inputs: ['ariaLabelText', 'colour', 'label'],
})
@Component({
	selector: 'ontario-badge',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['ariaLabelText', 'colour', 'label'],
})
export class OntarioBadge {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioBadge extends Components.OntarioBadge {}

@ProxyCmp({
	inputs: ['attribution', 'byline', 'quote'],
})
@Component({
	selector: 'ontario-blockquote',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['attribution', 'byline', 'quote'],
})
export class OntarioBlockquote {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioBlockquote extends Components.OntarioBlockquote {}

@ProxyCmp({
	inputs: ['ariaLabelText', 'elementId', 'htmlType', 'label', 'type'],
})
@Component({
	selector: 'ontario-button',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['ariaLabelText', 'elementId', 'htmlType', 'label', 'type'],
})
export class OntarioButton {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioButton extends Components.OntarioButton {}

@ProxyCmp({
	inputs: ['content', 'headingContent', 'headingContentType', 'headingType', 'highlightColour'],
})
@Component({
	selector: 'ontario-callout',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['content', 'headingContent', 'headingContentType', 'headingType', 'highlightColour'],
})
export class OntarioCallout {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioCallout extends Components.OntarioCallout {}

@ProxyCmp({
	inputs: [
		'ariaLabelText',
		'cardLink',
		'description',
		'headerColour',
		'horizontalImagePositionType',
		'horizontalImageSizeType',
		'image',
		'label',
		'layout',
	],
})
@Component({
	selector: 'ontario-card',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: [
		'ariaLabelText',
		'cardLink',
		'description',
		'headerColour',
		'horizontalImagePositionType',
		'horizontalImageSizeType',
		'image',
		'label',
		'layout',
	],
})
export class OntarioCard {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioCard extends Components.OntarioCard {}

@ProxyCmp({
	inputs: ['cardsPerRow'],
})
@Component({
	selector: 'ontario-card-collection',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['cardsPerRow'],
})
export class OntarioCardCollection {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioCardCollection extends Components.OntarioCardCollection {}

@ProxyCmp({
	inputs: [
		'caption',
		'customOnBlur',
		'customOnChange',
		'customOnFocus',
		'errorMessage',
		'hintExpander',
		'hintText',
		'language',
		'name',
		'options',
		'required',
	],
})
@Component({
	selector: 'ontario-checkboxes',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: [
		'caption',
		'customOnBlur',
		'customOnChange',
		'customOnFocus',
		'errorMessage',
		'hintExpander',
		'hintText',
		'language',
		'name',
		'options',
		'required',
	],
})
export class OntarioCheckboxes {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
		proxyOutputs(this, this.el, ['checkboxOnChange', 'checkboxOnBlur', 'checkboxOnFocus', 'inputErrorOccurred']);
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
	inputs: ['content'],
})
@Component({
	selector: 'ontario-critical-alert',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['content'],
})
export class OntarioCriticalAlert {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioCriticalAlert extends Components.OntarioCriticalAlert {}

@ProxyCmp({
	inputs: [
		'caption',
		'dateOptions',
		'dateValidator',
		'elementId',
		'hintText',
		'language',
		'maxYear',
		'minYear',
		'placeholder',
		'required',
	],
})
@Component({
	selector: 'ontario-date-input',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: [
		'caption',
		'dateOptions',
		'dateValidator',
		'elementId',
		'hintText',
		'language',
		'maxYear',
		'minYear',
		'placeholder',
		'required',
	],
})
export class OntarioDateInput {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
		proxyOutputs(this, this.el, ['inputOnInput', 'inputOnChange', 'inputOnBlur', 'inputOnFocus', 'inputErrorOccurred']);
	}
}

export declare interface OntarioDateInput extends Components.OntarioDateInput {
	/**
	 * Emitted when an `input` event occurs within the component.
	 */
	inputOnInput: EventEmitter<CustomEvent<{ value: string; fieldType: 'day' | 'month' | 'year' }>>;
	/**
	 * Emitted when a `change` event occurs within the component.
	 */
	inputOnChange: EventEmitter<CustomEvent<{ value: string; fieldType: 'day' | 'month' | 'year' }>>;
	/**
	 * Emitted when a keyboard input event occurs when an input has lost focus.
	 */
	inputOnBlur: EventEmitter<CustomEvent<'day' | 'month' | 'year'>>;
	/**
	 * Emitted when a keyboard input event occurs when an input has gained focus.
	 */
	inputOnFocus: EventEmitter<CustomEvent<'day' | 'month' | 'year'>>;
	/**
	 * Emitted when an error message is reported to the component.
	 */
	inputErrorOccurred: EventEmitter<CustomEvent<{ inputId: string; errorMessage: string }>>;
}

@ProxyCmp({
	inputs: [
		'caption',
		'customOnBlur',
		'customOnChange',
		'customOnFocus',
		'elementId',
		'errorMessage',
		'hintExpander',
		'hintText',
		'isEmptyStartOption',
		'language',
		'name',
		'options',
		'required',
	],
})
@Component({
	selector: 'ontario-dropdown-list',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: [
		'caption',
		'customOnBlur',
		'customOnChange',
		'customOnFocus',
		'elementId',
		'errorMessage',
		'hintExpander',
		'hintText',
		'isEmptyStartOption',
		'language',
		'name',
		'options',
		'required',
	],
})
export class OntarioDropdownList {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
		proxyOutputs(this, this.el, ['dropdownOnChange', 'dropdownOnBlur', 'dropdownOnFocus', 'inputErrorOccurred']);
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
	inputs: ['legend', 'legendSize'],
})
@Component({
	selector: 'ontario-fieldset',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['legend', 'legendSize'],
})
export class OntarioFieldset {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioFieldset extends Components.OntarioFieldset {}

@ProxyCmp({
	inputs: [
		'assetBasePath',
		'footerLinks',
		'language',
		'socialLinks',
		'threeColumnOptions',
		'topMargin',
		'twoColumnOptions',
		'type',
	],
})
@Component({
	selector: 'ontario-footer',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: [
		'assetBasePath',
		'footerLinks',
		'language',
		'socialLinks',
		'threeColumnOptions',
		'topMargin',
		'twoColumnOptions',
		'type',
	],
})
export class OntarioFooter {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioFooter extends Components.OntarioFooter {}

@ProxyCmp({
	inputs: [
		'applicationHeaderInfo',
		'assetBasePath',
		'customLanguageToggle',
		'disableDynamicMenu',
		'language',
		'languageToggleOptions',
		'menuItems',
		'type',
	],
})
@Component({
	selector: 'ontario-header',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: [
		'applicationHeaderInfo',
		'assetBasePath',
		'customLanguageToggle',
		'disableDynamicMenu',
		'language',
		'languageToggleOptions',
		'menuItems',
		'type',
	],
})
export class OntarioHeader {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioHeader extends Components.OntarioHeader {}

@ProxyCmp({
	inputs: ['content', 'elementId', 'hint', 'hintContentType'],
})
@Component({
	selector: 'ontario-hint-expander',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['content', 'elementId', 'hint', 'hintContentType'],
})
export class OntarioHintExpander {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
		proxyOutputs(this, this.el, ['toggleExpanderEvent']);
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
	methods: ['getHintTextId'],
})
@Component({
	selector: 'ontario-hint-text',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['elementId', 'hint', 'hintContentType'],
})
export class OntarioHintText {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioHintText extends Components.OntarioHintText {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-accessibility',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconAccessibility {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconAccessibility extends Components.OntarioIconAccessibility {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-account',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconAccount {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconAccount extends Components.OntarioIconAccount {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-add',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconAdd {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconAdd extends Components.OntarioIconAdd {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-add-alt',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconAddAlt {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconAddAlt extends Components.OntarioIconAddAlt {}

@ProxyCmp({
	inputs: ['iconWidth'],
})
@Component({
	selector: 'ontario-icon-alert-error',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['iconWidth'],
})
export class OntarioIconAlertError {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconAlertError extends Components.OntarioIconAlertError {}

@ProxyCmp({
	inputs: ['iconWidth'],
})
@Component({
	selector: 'ontario-icon-alert-information',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['iconWidth'],
})
export class OntarioIconAlertInformation {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconAlertInformation extends Components.OntarioIconAlertInformation {}

@ProxyCmp({
	inputs: ['iconWidth'],
})
@Component({
	selector: 'ontario-icon-alert-success',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['iconWidth'],
})
export class OntarioIconAlertSuccess {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconAlertSuccess extends Components.OntarioIconAlertSuccess {}

@ProxyCmp({
	inputs: ['iconWidth'],
})
@Component({
	selector: 'ontario-icon-alert-warning',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['iconWidth'],
})
export class OntarioIconAlertWarning {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconAlertWarning extends Components.OntarioIconAlertWarning {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-arrow-up',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconArrowUp {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconArrowUp extends Components.OntarioIconArrowUp {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-attach',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconAttach {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconAttach extends Components.OntarioIconAttach {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-bookmark-off',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconBookmarkOff {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconBookmarkOff extends Components.OntarioIconBookmarkOff {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-bookmark-on',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconBookmarkOn {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconBookmarkOn extends Components.OntarioIconBookmarkOn {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-calendar',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconCalendar {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconCalendar extends Components.OntarioIconCalendar {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-camera',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconCamera {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconCamera extends Components.OntarioIconCamera {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-chevron-down',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconChevronDown {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconChevronDown extends Components.OntarioIconChevronDown {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-chevron-left',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconChevronLeft {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconChevronLeft extends Components.OntarioIconChevronLeft {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-chevron-right',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconChevronRight {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconChevronRight extends Components.OntarioIconChevronRight {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-chevron-up',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconChevronUp {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconChevronUp extends Components.OntarioIconChevronUp {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-clock',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconClock {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconClock extends Components.OntarioIconClock {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-close',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconClose {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconClose extends Components.OntarioIconClose {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-close-header',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconCloseHeader {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconCloseHeader extends Components.OntarioIconCloseHeader {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-cloud',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconCloud {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconCloud extends Components.OntarioIconCloud {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-collapse',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconCollapse {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconCollapse extends Components.OntarioIconCollapse {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-credit-card',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconCreditCard {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconCreditCard extends Components.OntarioIconCreditCard {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-critical-alert-warning',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconCriticalAlertWarning {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconCriticalAlertWarning extends Components.OntarioIconCriticalAlertWarning {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-delete',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconDelete {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconDelete extends Components.OntarioIconDelete {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-document',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconDocument {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconDocument extends Components.OntarioIconDocument {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-download',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconDownload {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconDownload extends Components.OntarioIconDownload {}

@ProxyCmp({
	inputs: ['iconWidth'],
})
@Component({
	selector: 'ontario-icon-dropdown-arrow',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['iconWidth'],
})
export class OntarioIconDropdownArrow {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconDropdownArrow extends Components.OntarioIconDropdownArrow {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-edit',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconEdit {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconEdit extends Components.OntarioIconEdit {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-email',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconEmail {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconEmail extends Components.OntarioIconEmail {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-expand',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconExpand {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconExpand extends Components.OntarioIconExpand {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-export',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconExport {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconExport extends Components.OntarioIconExport {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-facebook',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconFacebook {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconFacebook extends Components.OntarioIconFacebook {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-facebook-alt',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconFacebookAlt {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconFacebookAlt extends Components.OntarioIconFacebookAlt {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-favourite-off',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconFavouriteOff {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconFavouriteOff extends Components.OntarioIconFavouriteOff {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-favourite-on',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconFavouriteOn {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconFavouriteOn extends Components.OntarioIconFavouriteOn {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-filter',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconFilter {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconFilter extends Components.OntarioIconFilter {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-flickr',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconFlickr {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconFlickr extends Components.OntarioIconFlickr {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-grid',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconGrid {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconGrid extends Components.OntarioIconGrid {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-help',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconHelp {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconHelp extends Components.OntarioIconHelp {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-instagram',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconInstagram {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconInstagram extends Components.OntarioIconInstagram {}

@ProxyCmp({
	inputs: ['iconWidth'],
})
@Component({
	selector: 'ontario-icon-interac-en',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['iconWidth'],
})
export class OntarioIconInteracEn {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconInteracEn extends Components.OntarioIconInteracEn {}

@ProxyCmp({
	inputs: ['iconWidth'],
})
@Component({
	selector: 'ontario-icon-interac-en-alt',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['iconWidth'],
})
export class OntarioIconInteracEnAlt {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconInteracEnAlt extends Components.OntarioIconInteracEnAlt {}

@ProxyCmp({
	inputs: ['iconWidth'],
})
@Component({
	selector: 'ontario-icon-interac-fr',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['iconWidth'],
})
export class OntarioIconInteracFr {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconInteracFr extends Components.OntarioIconInteracFr {}

@ProxyCmp({
	inputs: ['iconWidth'],
})
@Component({
	selector: 'ontario-icon-interac-fr-alt',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['iconWidth'],
})
export class OntarioIconInteracFrAlt {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconInteracFrAlt extends Components.OntarioIconInteracFrAlt {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-linkedin',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconLinkedin {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconLinkedin extends Components.OntarioIconLinkedin {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-linkedin-alt',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconLinkedinAlt {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconLinkedinAlt extends Components.OntarioIconLinkedinAlt {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-list',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconList {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconList extends Components.OntarioIconList {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-live-chat',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconLiveChat {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconLiveChat extends Components.OntarioIconLiveChat {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-location-off',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconLocationOff {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconLocationOff extends Components.OntarioIconLocationOff {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-location-on',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconLocationOn {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconLocationOn extends Components.OntarioIconLocationOn {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-lock-off',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconLockOff {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconLockOff extends Components.OntarioIconLockOff {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-lock-on',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconLockOn {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconLockOn extends Components.OntarioIconLockOn {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-map',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconMap {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconMap extends Components.OntarioIconMap {}

@ProxyCmp({
	inputs: ['iconWidth'],
})
@Component({
	selector: 'ontario-icon-mastercard',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['iconWidth'],
})
export class OntarioIconMastercard {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconMastercard extends Components.OntarioIconMastercard {}

@ProxyCmp({
	inputs: ['iconWidth'],
})
@Component({
	selector: 'ontario-icon-mastercard-alt',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['iconWidth'],
})
export class OntarioIconMastercardAlt {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconMastercardAlt extends Components.OntarioIconMastercardAlt {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-media-fast-forward',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconMediaFastForward {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconMediaFastForward extends Components.OntarioIconMediaFastForward {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-media-fast-rewind',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconMediaFastRewind {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconMediaFastRewind extends Components.OntarioIconMediaFastRewind {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-media-pause',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconMediaPause {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconMediaPause extends Components.OntarioIconMediaPause {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-media-play',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconMediaPlay {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconMediaPlay extends Components.OntarioIconMediaPlay {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-media-stop',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconMediaStop {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconMediaStop extends Components.OntarioIconMediaStop {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-menu',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconMenu {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconMenu extends Components.OntarioIconMenu {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-menu-header',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconMenuHeader {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconMenuHeader extends Components.OntarioIconMenuHeader {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-microphone-off',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconMicrophoneOff {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconMicrophoneOff extends Components.OntarioIconMicrophoneOff {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-microphone-on',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconMicrophoneOn {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconMicrophoneOn extends Components.OntarioIconMicrophoneOn {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-more-vertical',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconMoreVertical {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconMoreVertical extends Components.OntarioIconMoreVertical {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-new-window',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconNewWindow {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconNewWindow extends Components.OntarioIconNewWindow {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-next',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconNext {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconNext extends Components.OntarioIconNext {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-notification',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconNotification {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconNotification extends Components.OntarioIconNotification {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-password-hide',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconPasswordHide {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconPasswordHide extends Components.OntarioIconPasswordHide {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-password-show',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconPasswordShow {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconPasswordShow extends Components.OntarioIconPasswordShow {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-phone',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconPhone {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconPhone extends Components.OntarioIconPhone {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-photo',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconPhoto {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconPhoto extends Components.OntarioIconPhoto {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-pin-location-off',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconPinLocationOff {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconPinLocationOff extends Components.OntarioIconPinLocationOff {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-pin-location-on',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconPinLocationOn {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconPinLocationOn extends Components.OntarioIconPinLocationOn {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-previous',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconPrevious {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconPrevious extends Components.OntarioIconPrevious {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-print',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconPrint {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconPrint extends Components.OntarioIconPrint {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-remove',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconRemove {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconRemove extends Components.OntarioIconRemove {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-remove-alt',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconRemoveAlt {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconRemoveAlt extends Components.OntarioIconRemoveAlt {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-replay',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconReplay {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconReplay extends Components.OntarioIconReplay {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-rss-feed',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconRssFeed {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconRssFeed extends Components.OntarioIconRssFeed {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-save',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconSave {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconSave extends Components.OntarioIconSave {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-search',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconSearch {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconSearch extends Components.OntarioIconSearch {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-search-white',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconSearchWhite {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconSearchWhite extends Components.OntarioIconSearchWhite {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-sentiment-1',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconSentiment1 {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconSentiment1 extends Components.OntarioIconSentiment1 {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-sentiment-2',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconSentiment2 {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconSentiment2 extends Components.OntarioIconSentiment2 {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-sentiment-3',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconSentiment3 {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconSentiment3 extends Components.OntarioIconSentiment3 {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-sentiment-4',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconSentiment4 {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconSentiment4 extends Components.OntarioIconSentiment4 {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-sentiment-5',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconSentiment5 {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconSentiment5 extends Components.OntarioIconSentiment5 {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-settings',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconSettings {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconSettings extends Components.OntarioIconSettings {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-share',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconShare {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconShare extends Components.OntarioIconShare {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-sort',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconSort {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconSort extends Components.OntarioIconSort {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-tag',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconTag {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconTag extends Components.OntarioIconTag {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-text-message',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconTextMessage {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconTextMessage extends Components.OntarioIconTextMessage {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-timer',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconTimer {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconTimer extends Components.OntarioIconTimer {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-transport-bicycle',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconTransportBicycle {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconTransportBicycle extends Components.OntarioIconTransportBicycle {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-transport-bus',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconTransportBus {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconTransportBus extends Components.OntarioIconTransportBus {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-transport-car',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconTransportCar {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconTransportCar extends Components.OntarioIconTransportCar {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-transport-walk',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconTransportWalk {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconTransportWalk extends Components.OntarioIconTransportWalk {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-tty',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconTty {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconTty extends Components.OntarioIconTty {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-twitter',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconTwitter {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconTwitter extends Components.OntarioIconTwitter {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-twitter-alt',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconTwitterAlt {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconTwitterAlt extends Components.OntarioIconTwitterAlt {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-upload',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconUpload {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconUpload extends Components.OntarioIconUpload {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-video',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconVideo {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconVideo extends Components.OntarioIconVideo {}

@ProxyCmp({
	inputs: ['iconWidth'],
})
@Component({
	selector: 'ontario-icon-visa',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['iconWidth'],
})
export class OntarioIconVisa {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconVisa extends Components.OntarioIconVisa {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-vote-dislike',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconVoteDislike {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconVoteDislike extends Components.OntarioIconVoteDislike {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-vote-like',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconVoteLike {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconVoteLike extends Components.OntarioIconVoteLike {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-vpn-key',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconVpnKey {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconVpnKey extends Components.OntarioIconVpnKey {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-wheelchair',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconWheelchair {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconWheelchair extends Components.OntarioIconWheelchair {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-wifi',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconWifi {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconWifi extends Components.OntarioIconWifi {}

@ProxyCmp({
	inputs: ['colour', 'iconWidth'],
})
@Component({
	selector: 'ontario-icon-youtube',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['colour', 'iconWidth'],
})
export class OntarioIconYoutube {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioIconYoutube extends Components.OntarioIconYoutube {}

@ProxyCmp({
	inputs: [
		'caption',
		'customOnBlur',
		'customOnChange',
		'customOnFocus',
		'customOnInput',
		'elementId',
		'enableLiveValidation',
		'errorMessage',
		'hintExpander',
		'hintText',
		'inputValidator',
		'inputWidth',
		'language',
		'name',
		'required',
		'requiredValidationMessage',
		'type',
		'value',
	],
})
@Component({
	selector: 'ontario-input',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: [
		'caption',
		'customOnBlur',
		'customOnChange',
		'customOnFocus',
		'customOnInput',
		'elementId',
		'enableLiveValidation',
		'errorMessage',
		'hintExpander',
		'hintText',
		'inputValidator',
		'inputWidth',
		'language',
		'name',
		'required',
		'requiredValidationMessage',
		'type',
		'value',
	],
})
export class OntarioInput {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
		proxyOutputs(this, this.el, ['inputOnInput', 'inputOnChange', 'inputOnBlur', 'inputOnFocus', 'inputErrorOccurred']);
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
	inputs: ['customLanguageToggle', 'language', 'size', 'url'],
})
@Component({
	selector: 'ontario-language-toggle',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['customLanguageToggle', 'language', 'size', 'url'],
})
export class OntarioLanguageToggle {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
		proxyOutputs(this, this.el, ['setAppLanguage', 'headerLanguageToggled']);
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
	inputs: ['fullScreenOverlay', 'isLoading', 'language', 'message', 'type'],
})
@Component({
	selector: 'ontario-loading-indicator',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['fullScreenOverlay', 'isLoading', 'language', 'message', 'type'],
})
export class OntarioLoadingIndicator {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioLoadingIndicator extends Components.OntarioLoadingIndicator {}

@ProxyCmp({
	inputs: ['content', 'heading', 'type'],
})
@Component({
	selector: 'ontario-page-alert',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['content', 'heading', 'type'],
})
export class OntarioPageAlert {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioPageAlert extends Components.OntarioPageAlert {}

@ProxyCmp({
	inputs: [
		'caption',
		'customOnBlur',
		'customOnChange',
		'customOnFocus',
		'errorMessage',
		'hintExpander',
		'hintText',
		'language',
		'name',
		'options',
		'required',
	],
})
@Component({
	selector: 'ontario-radio-buttons',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: [
		'caption',
		'customOnBlur',
		'customOnChange',
		'customOnFocus',
		'errorMessage',
		'hintExpander',
		'hintText',
		'language',
		'name',
		'options',
		'required',
	],
})
export class OntarioRadioButtons {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
		proxyOutputs(this, this.el, ['radioOnChange', 'radioOnBlur', 'radioOnFocus', 'inputErrorOccurred']);
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
	inputs: [
		'caption',
		'customOnBlur',
		'customOnChange',
		'customOnFocus',
		'customOnInput',
		'elementId',
		'hintText',
		'language',
		'performSearch',
		'required',
		'value',
	],
})
@Component({
	selector: 'ontario-search-box',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: [
		'caption',
		'customOnBlur',
		'customOnChange',
		'customOnFocus',
		'customOnInput',
		'elementId',
		'hintText',
		'language',
		'performSearch',
		'required',
		'value',
	],
})
export class OntarioSearchBox {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
		proxyOutputs(this, this.el, ['searchOnSubmit', 'inputOnInput', 'inputOnChange', 'inputOnBlur', 'inputOnFocus']);
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
	inputs: [
		'backButtonUrl',
		'currentStep',
		'customOnClick',
		'language',
		'numberOfSteps',
		'percentageComplete',
		'showBackButton',
	],
})
@Component({
	selector: 'ontario-step-indicator',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: [
		'backButtonUrl',
		'currentStep',
		'customOnClick',
		'language',
		'numberOfSteps',
		'percentageComplete',
		'showBackButton',
	],
})
export class OntarioStepIndicator {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioStepIndicator extends Components.OntarioStepIndicator {}

@ProxyCmp({
	inputs: ['caption', 'condensed', 'fullWidth', 'tableColumns', 'tableData', 'zebraStripes'],
})
@Component({
	selector: 'ontario-table',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['caption', 'condensed', 'fullWidth', 'tableColumns', 'tableData', 'zebraStripes'],
})
export class OntarioTable {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioTable extends Components.OntarioTable {}

@ProxyCmp({
	inputs: ['badgeLabel', 'hint', 'label', 'link'],
})
@Component({
	selector: 'ontario-task',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: ['badgeLabel', 'hint', 'label', 'link'],
})
export class OntarioTask {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioTask extends Components.OntarioTask {}

@ProxyCmp({})
@Component({
	selector: 'ontario-task-list',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: [],
})
export class OntarioTaskList {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
	}
}

export declare interface OntarioTaskList extends Components.OntarioTaskList {}

@ProxyCmp({
	inputs: [
		'caption',
		'customOnBlur',
		'customOnChange',
		'customOnFocus',
		'customOnInput',
		'elementId',
		'errorMessage',
		'hintExpander',
		'hintText',
		'language',
		'name',
		'required',
		'value',
	],
})
@Component({
	selector: 'ontario-textarea',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: [
		'caption',
		'customOnBlur',
		'customOnChange',
		'customOnFocus',
		'customOnInput',
		'elementId',
		'errorMessage',
		'hintExpander',
		'hintText',
		'language',
		'name',
		'required',
		'value',
	],
})
export class OntarioTextarea {
	protected el: HTMLElement;
	constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
		c.detach();
		this.el = r.nativeElement;
		proxyOutputs(this, this.el, ['inputOnInput', 'inputOnChange', 'inputOnBlur', 'inputOnFocus', 'inputErrorOccurred']);
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
