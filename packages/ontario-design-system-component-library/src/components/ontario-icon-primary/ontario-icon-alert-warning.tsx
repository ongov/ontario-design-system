import { Component, h } from '@stencil/core';
import alertWarning from './assets/ontario-icon-alert-warning.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-alert-warning',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class ontarioIconAlertWarning {
  render() {
    return <div class="ontario-icon" innerHTML={alertWarning} />;
  }
};
