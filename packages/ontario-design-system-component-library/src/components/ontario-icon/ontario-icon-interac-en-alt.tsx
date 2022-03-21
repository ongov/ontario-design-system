import { Component, h, Prop } from '@stencil/core';
import interacEnAlt from './assets/ontario-icon-interac-en-alt.svg';

@Component({
  tag: 'ontario-icon-interac-en-alt',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconInteracEnAlt {
  /**
   * The icon width will autogenerate the height since the icons are in square format, thus preserving
   * the aspect ratio.
   */
  @Prop() iconWidth?: number = 24;

  render() {
    return <div class="ontario-icon" style={{
      width: `${this.iconWidth}px`
    }} innerHTML={interacEnAlt} />;
  }
};
