import { Component, Prop, h } from '@stencil/core';
import wheelchair from './assets/ontario-icon-wheelchair.svg';

@Component({
  tag: 'ontario-icon-wheelchair',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconWheelchair {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={wheelchair} />;
  }
};
