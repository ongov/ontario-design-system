import { Component, Prop, h } from '@stencil/core';
import collapse from './assets/ontario-icon-collapse.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-collapse',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class OntarioIconCollapse {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={collapse} />;
  }
};
