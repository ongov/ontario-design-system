import { Component, Prop, Element, h } from '@stencil/core';

@Component({
	tag: 'ontario-button',
	styleUrl: 'ontario-button.css',
	shadow: true,
})
export class OntarioButton {
  @Element() el: HTMLElement;
	@Prop() type: string = 'primary';
	@Prop() label: string;
	@Prop() ariaLabel: string;

  /**
   * The attribute property is one of the propOptions that explicity defines a property that has an associated DOM attribute and the name of it.
   * Because HTML attributes are case-insensitive, the default convention for a camelCase-named property would be hyphenated.
   * Example: isSubmitButton would become is-submit-button when used as a HTML attribute while resetButton can be used as a HTML attribute due to its propOptions configuration.
   */
	@Prop() isSubmitButton: boolean;
	@Prop({ attribute: 'resetButton' }) isResetButton: boolean;

  private getLabel() {
    console.log('button textContent: ', this.el.textContent);
    return this.el.textContent;
  }

	render() {
		return (
			<button
				type={this.isSubmitButton ? 'submit' : (this.isResetButton ? 'reset' : 'button')}
				class={'ontario-button ontario-button--' + this.type.toLowerCase()}
			>{this.getLabel()}
			</button>
		);
	}
}
