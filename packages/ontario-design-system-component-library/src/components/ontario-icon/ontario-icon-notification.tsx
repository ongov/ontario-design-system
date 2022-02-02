import { Component, Prop, h } from '@stencil/core';
import notification from './assets/ontario-icon-notification.svg';

@Component({
  tag: 'ontario-icon-notification',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconNotification {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={notification} />;
  }
};
