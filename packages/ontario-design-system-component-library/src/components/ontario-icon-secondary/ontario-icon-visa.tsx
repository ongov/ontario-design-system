import { Component, h } from '@stencil/core';
import visa from './assets/ontario-icon-visa.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-visa',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconVisa {
  render() {
    return <div class="ontario-icon" innerHTML={visa} />;
  }
};
