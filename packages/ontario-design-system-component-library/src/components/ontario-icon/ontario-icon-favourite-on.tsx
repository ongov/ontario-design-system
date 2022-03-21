import { Component, Prop, h } from '@stencil/core';
import favouriteOn from './assets/ontario-icon-favourite-on.svg';

@Component({
  tag: 'ontario-icon-favourite-on',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconFavouriteOn {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  /**
   * The icon width will autogenerate the height since the icons are in square format, thus preserving
   * the aspect ratio.
   */
  @Prop() iconWidth?: number = 24;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} style={{
      width: `${this.iconWidth}px`
    }} innerHTML={favouriteOn} />;
  }
};
