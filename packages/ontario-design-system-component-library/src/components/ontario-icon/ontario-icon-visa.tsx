import { Component, h, Prop } from '@stencil/core';
import visa from './assets/ontario-icon-visa.svg';

@Component({
  tag: 'ontario-icon-visa',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconVisa {
  /**
   * The icon width will autogenerate the height since the icons are in square format, thus preserving
   * the aspect ratio.
   */
  @Prop() iconWidth?: number = 24;

  render() {
    return <div class="ontario-icon" style={{
      width: `${this.iconWidth}px`
    }} innerHTML={visa} />;
  }
};
