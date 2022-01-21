import { Component, Prop, h } from '@stencil/core';
import passwordShow from './assets/ontario-icon-password-show.svg';

@Component({
  tag: 'ontario-icon-password-show',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconPasswordShow {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={passwordShow} />;
  }
};
