import { Component, h } from '@stencil/core';
import interacEnAlt from './assets/ontario-icon-interac-en-alt.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-interac-en-alt',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconInteracEnAlt {
  render() {
    return <div class="ontario-icon" innerHTML={interacEnAlt} />;
  }
};
