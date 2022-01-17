import { Component, h } from '@stencil/core';
import alertSuccess from './assets/ontario-icon-alert-success.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-alert-success',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class ontarioIconAlertSuccess {
  render() {
    return <div class="ontario-icon" innerHTML={alertSuccess} />;
  }
};
