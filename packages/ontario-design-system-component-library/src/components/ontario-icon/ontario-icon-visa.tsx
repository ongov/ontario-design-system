import { Component, h } from '@stencil/core';
import visa from './assets/ontario-icon-visa.svg';

@Component({
  tag: 'ontario-icon-visa',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconVisa {
  render() {
    return <div class="ontario-icon" innerHTML={visa} />;
  }
};
