import { Component, Prop, h } from '@stencil/core';
import wheelchair from './assets/ontario-icon-wheelchair.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-wheelchair',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconWheelchair {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={wheelchair} />;
  }
};
