import { Component, Prop, h } from '@stencil/core';
import passwordShow from './assets/ontario-icon-password-show.svg';

@Component({
  tag: 'ontario-icon-password-show',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconPasswordShow {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={passwordShow} />;
  }
};
