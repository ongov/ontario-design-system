import { Component, h, Prop, Watch } from '@stencil/core';
import alertWarning from './assets/ontario-icon-alert-warning.svg'

@Component({
  tag: 'ontario-icon-alert-warning',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconAlertWarning {
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
    }} innerHTML={alertWarning} />;
  }
};
