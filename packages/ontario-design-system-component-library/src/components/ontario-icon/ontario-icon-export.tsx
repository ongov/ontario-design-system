import { Component, Prop, h } from '@stencil/core';
import exportIcon from './assets/ontario-icon-export.svg';

@Component({
  tag: 'ontario-icon-export',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconExport {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={exportIcon} />;
  }
};
