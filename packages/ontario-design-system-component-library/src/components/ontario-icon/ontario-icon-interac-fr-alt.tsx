import { Component, h } from '@stencil/core';
import interacFrAlt from './assets/ontario-icon-interac-fr-alt.svg';

@Component({
  tag: 'ontario-icon-interac-fr-alt',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconInteracFrAlt {
  render() {
    return <div class="ontario-icon" innerHTML={interacFrAlt} />;
  }
};
