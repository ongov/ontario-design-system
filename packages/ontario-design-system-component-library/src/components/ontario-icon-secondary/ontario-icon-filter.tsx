import { Component, Prop, h } from '@stencil/core';
import filter from './assets/ontario-icon-filter.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-filter',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconFilter {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={filter} />;
  }
};
