import { Component, Prop, h } from '@stencil/core';
import download from './assets/ontario-icon-download.svg';

@Component({
  tag: 'ontario-icon-download',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconDownload {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={download} />;
  }
};
