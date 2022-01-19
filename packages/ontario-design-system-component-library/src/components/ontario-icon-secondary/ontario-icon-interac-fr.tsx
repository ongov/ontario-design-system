import { Component, h } from '@stencil/core';
import interacFr from './assets/ontario-icon-interac-fr.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-interac-fr',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconInteracFr {
  render() {
    return <div class="ontario-icon" innerHTML={interacFr} />;
  }
};
