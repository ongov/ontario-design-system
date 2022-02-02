import { Component, Prop, h } from '@stencil/core';
import tty from './assets/ontario-icon-tty.svg';

@Component({
  tag: 'ontario-icon-tty',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconTty {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={tty} />;
  }
};
