import { Component, Prop, h } from '@stencil/core';
import lockOff from './assets/ontario-icon-lock-off.svg';

@Component({
  tag: 'ontario-icon-lock-off',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconLockOff {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={lockOff} />;
  }
};
