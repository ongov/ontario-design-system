import { Component, Prop, h } from '@stencil/core';
import chevIcon from './assets/ontario-icons.svg'

/** @internal **/
@Component({
  tag: 'chevron-up',
  shadow: false,
})

export class chevronUpSvg {

  @Prop() size: string;

  render() {
    return <div class='ontario-icon' innerHTML={chevIcon} />;
  }
};
