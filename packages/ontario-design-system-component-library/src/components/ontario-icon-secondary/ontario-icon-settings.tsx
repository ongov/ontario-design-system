import { Component, Prop, h } from '@stencil/core';
import settings from './assets/ontario-icon-settings.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-settings',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconPasswordSettings {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={settings} />;
  }
};
