import { Component, Prop, h } from '@stencil/core';
import dropdownArrow from './assets/ontario-icon-dropdown-arrow.svg'

@Component({
  tag: 'ontario-icon-dropdown-arrow',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconDropdownArrow {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  /**
   * The icon width will autogenerate the height since the icons are in square format, thus preserving
   * the aspect ratio.
   */
  @Prop() iconWidth?: number = 24;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} style={{
      width: `${this.iconWidth}px`
    }} innerHTML={dropdownArrow} />;
  }
};
