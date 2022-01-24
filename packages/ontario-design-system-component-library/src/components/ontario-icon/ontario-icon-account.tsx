import { Component, Prop, h } from '@stencil/core';
import account from './assets/ontario-icon-account.svg';

@Component({
  tag: 'ontario-icon-account',
  styleUrl: 'ontario-icon.scss',
  shadow: false,
})

export class OntarioIconAccount {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={account} />;
  }
};
