import { Component, h } from '@stencil/core';
import interacFr from './assets/ontario-icon-interac-fr.svg';

@Component({
  tag: 'ontario-icon-interac-fr',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconInteracFr {
  render() {
    return <div class="ontario-icon" innerHTML={interacFr} />;
  }
};
