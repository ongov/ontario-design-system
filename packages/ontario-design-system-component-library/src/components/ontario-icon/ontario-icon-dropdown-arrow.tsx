import { Component, Prop, h } from '@stencil/core';
import dropdownArrow from './assets/ontario-icon-dropdown-arrow.svg'

/** @internal **/
@Component({
  tag: 'ontario-icon-dropdown-arrow',
  styleUrl: 'ontario-icon.scss',
  shadow: false,
})

export class OntarioIconDropdownArrow {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={dropdownArrow} />;
  }
};
