import { Component, Prop, h } from '@stencil/core';
import facebookAlt from './assets/ontario-icon-facebook-alt.svg';

@Component({
  tag: 'ontario-icon-facebook-alt',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconFacebookAlt {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={facebookAlt} />;
  }
};
