import { Component, Prop, h } from '@stencil/core';
import passwordHide from './assets/ontario-icon-password-hide.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-password-hide',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconPasswordHide {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={passwordHide} />;
  }
};
