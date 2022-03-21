import { Component, h, Prop } from '@stencil/core';
import alertInformation from './assets/ontario-icon-alert-information.svg'

@Component({
  tag: 'ontario-icon-alert-information',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconAlertError {
  /**
   * The icon width will autogenerate the height since the icons are in square format, thus preserving
   * the aspect ratio.
   */
  @Prop() iconWidth?: number = 24;

  render() {
    return <div class="ontario-icon" style={{
      width: `${this.iconWidth}px`
    }} innerHTML={alertInformation} />;
  }
};
