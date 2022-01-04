import { Component, Host, h, Element, Prop } from '@stencil/core';

/**
 * Ontario Label component properties
 */
export interface OntarioLabelProperties {
  /**
   * The type of label to render.
   */
  type?: 'default' | 'large' | 'heading';

  /**
   * The form control with which the caption is associated.
   */
  for?: string | HTMLElement;

  /**
   * The text to display as label.
   */
  caption?: string;
}

/**
 * Ontario Design System label web component
 */
@Component({
  tag: 'ontario-label',
  styleUrl: 'ontario-label.scss',
  shadow: true,
})
export class OntarioLabel implements OntarioLabelProperties {

  @Element() host: HTMLElement;

	/**
	 * The text to display as label.
	 */
	@Prop() caption: string | undefined;

  /**
   * The form control with which the caption is associated.
   */
  @Prop() for: string | HTMLElement | undefined;

	/**
	 * The type of label to render.
	 */
	@Prop() type: 'default' | 'large' | 'heading' = 'default';

	/**
	 * The unique identifier of the button
	 */
	@Prop({ attribute: 'id' }) buttonId?: string | undefined;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
