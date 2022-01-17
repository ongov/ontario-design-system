import { Component, h } from '@stencil/core';
import alertError from './assets/ontario-icon-alert-error.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-alert-error',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class ontarioIconAlertError {
  render() {
    return <div class="ontario-icon" innerHTML={alertError} />;
  }
};
