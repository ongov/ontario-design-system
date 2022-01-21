import { Component, Prop, h } from '@stencil/core';
import clock from './assets/ontario-icon-clock.svg';

@Component({
  tag: 'ontario-icon-clock',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconClock {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={clock} />;
  }
};
