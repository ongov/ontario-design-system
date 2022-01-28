import { Component, h } from '@stencil/core';
import alertSuccess from './assets/ontario-icon-alert-success.svg'

@Component({
  tag: 'ontario-icon-alert-success',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconAlertSuccess {
  render() {
    return <div class="ontario-icon" innerHTML={alertSuccess} />;
  }
};
