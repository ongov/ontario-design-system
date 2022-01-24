import { Component, h } from '@stencil/core';
import alertError from './assets/ontario-icon-alert-error.svg'

@Component({
  tag: 'ontario-icon-alert-error',
  styleUrl: 'ontario-icon.scss',
  shadow: false,
})

export class OntarioIconAlertError {
  render() {
    return <div class="ontario-icon" innerHTML={alertError} />;
  }
};
