import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'ontario-label',
  styleUrl: 'ontario-label.scss',
  shadow: true,
})
export class OntarioLabel {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
