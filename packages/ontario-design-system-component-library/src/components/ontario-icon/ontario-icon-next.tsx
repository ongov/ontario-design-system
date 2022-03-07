import { Component, Prop, h } from '@stencil/core';
import next from './assets/ontario-icon-next.svg';

@Component({
  tag: 'ontario-icon-next',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconNext {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={next} />;
  }
};
