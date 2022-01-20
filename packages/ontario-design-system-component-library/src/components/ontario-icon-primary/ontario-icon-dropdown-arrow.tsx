import { Component, Prop, h } from '@stencil/core';
import dropdownArrow from './assets/ontario-icon-dropdown-arrow.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-dropdown-arrow',
  styleUrl: 'ontario-icon-primary.scss',
  shadow: false,
})

export class ontarioIconDropdownArrow {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={dropdownArrow} />;
  }
};
