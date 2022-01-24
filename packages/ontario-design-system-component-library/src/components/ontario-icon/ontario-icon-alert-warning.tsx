import { Component, h } from '@stencil/core';
import alertWarning from './assets/ontario-icon-alert-warning.svg'

@Component({
  tag: 'ontario-icon-alert-warning',
  styleUrl: 'ontario-icon.scss',
  shadow: false,
})

export class OntarioIconAlertWarning {
  render() {
    return <div class="ontario-icon" innerHTML={alertWarning} />;
  }
};
