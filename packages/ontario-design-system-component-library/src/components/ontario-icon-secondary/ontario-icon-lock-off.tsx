import { Component, Prop, h } from '@stencil/core';
import lockOff from './assets/ontario-icon-lock-off.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-lock-off',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconLockOff {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={lockOff} />;
  }
};
