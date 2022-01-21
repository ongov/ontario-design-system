import { Component, Prop, h } from '@stencil/core';
import next from './assets/ontario-icon-next.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-next',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconNext {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={next} />;
  }
};
