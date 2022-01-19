import { Component, h } from '@stencil/core';
import interacEn from './assets/ontario-icon-interac-en-alt.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-interac-en',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconInteracEn {
  render() {
    return <div class="ontario-icon" innerHTML={interacEn} />;
  }
};
