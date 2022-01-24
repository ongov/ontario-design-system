import { Component, h } from '@stencil/core';
import interacEn from './assets/ontario-icon-interac-en-alt.svg';

@Component({
  tag: 'ontario-icon-interac-en',
  styleUrl: 'ontario-icon.scss',
  shadow: false,
})

export class OntarioIconInteracEn {
  render() {
    return <div class="ontario-icon" innerHTML={interacEn} />;
  }
};
