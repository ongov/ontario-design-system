import { Component, h, Prop, Watch } from '@stencil/core';
import alertSuccess from './assets/ontario-icon-alert-success.svg'

@Component({
  tag: 'ontario-icon-alert-success',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconAlertSuccess {
  /**
   * The icon width will autogenerate the height since the icons are in square format, thus preserving
   * the aspect ratio.
   */
  @Prop() iconWidth: number = 24;

  @Watch('iconWidth')
  validateWidth() {
    const defaultWidth = 24;

    // If value is not a number, set the iconWidth to be 24
    if (isNaN(this.iconWidth)) {
      this.iconWidth = defaultWidth;
    }
  }

  componentWillLoad() {
    this.validateWidth();
  }
  render() {
    return <div class="ontario-icon" style={{
      width: `${this.iconWidth}px`
    }} innerHTML={alertSuccess} />;
  }
};
