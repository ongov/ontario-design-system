import { Component, Prop, h } from '@stencil/core';
import vpnKey from './assets/ontario-icon-vpn-key.svg';

@Component({
  tag: 'ontario-icon-vpn-key',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconVpnKey {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={vpnKey} />;
  }
};
