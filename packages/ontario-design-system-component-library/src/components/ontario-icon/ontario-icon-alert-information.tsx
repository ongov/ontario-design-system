import { Component, h } from '@stencil/core';
import alertInformation from './assets/ontario-icon-alert-information.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-alert-information',
  styleUrl: 'ontario-icon.scss',
  shadow: false,
})

export class OntarioIconAlertError {
  render() {
    return <div class="ontario-icon" innerHTML={alertInformation} />;
  }
};
