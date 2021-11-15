import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'ontario-button',
  styleUrl: 'ontario-button.css',
  shadow: true,
})
export class OntarioButton {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
