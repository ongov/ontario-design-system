import { Component, Prop, h } from '@stencil/core';
import settings from './assets/ontario-icon-settings.svg';

@Component({
  tag: 'ontario-icon-settings',
  styleUrl: 'ontario-icon.scss',
  shadow: false,
})

export class OntarioIconPasswordSettings {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={settings} />;
  }
};
