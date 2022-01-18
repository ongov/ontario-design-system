import { Component, Prop, h } from '@stencil/core';
import account from './assets/ontario-icon-account.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-account',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconAccount {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={account} />;
  }
};
