import { Component, Prop, h } from '@stencil/core';
import lockOn from './assets/ontario-icon-lock-on.svg';

@Component({
  tag: 'ontario-icon-lock-on',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconLockOn {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={lockOn} />;
  }
};