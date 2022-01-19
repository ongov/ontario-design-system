import { Component, h } from '@stencil/core';
import interacFrAlt from './assets/ontario-icon-interac-fr-alt.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-interac-fr-alt',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconInteracFrAlt {
  render() {
    return <div class="ontario-icon" innerHTML={interacFrAlt} />;
  }
};
