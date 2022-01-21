import { Component, Prop, h } from '@stencil/core';
import download from './assets/ontario-icon-download.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-download',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconDownload {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={download} />;
  }
};
