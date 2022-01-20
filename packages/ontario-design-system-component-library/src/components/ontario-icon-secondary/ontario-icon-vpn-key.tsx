import { Component, Prop, h } from '@stencil/core';
import vpnKey from './assets/ontario-icon-vpn-key.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-vpn-key',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconVpnKey {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={vpnKey} />;
  }
};
