import { Component, Prop, h } from '@stencil/core';
import facebookAlt from './assets/ontario-icon-facebook-alt.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-facebook-alt',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconFacebookAlt {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={facebookAlt} />;
  }
};
