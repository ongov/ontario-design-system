import { Component, h, Prop } from '@stencil/core';
import interacFrAlt from './assets/ontario-icon-interac-fr-alt.svg';

@Component({
  tag: 'ontario-icon-interac-fr-alt',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconInteracFrAlt {
  /**
   * The icon width will autogenerate the height since the icons are in square format, thus preserving
   * the aspect ratio.
   */
  @Prop() iconWidth?: number = 24;

  render() {
    return <div class="ontario-icon" style={{
      width: `${this.iconWidth}px`
    }} innerHTML={interacFrAlt} />;
  }
};
