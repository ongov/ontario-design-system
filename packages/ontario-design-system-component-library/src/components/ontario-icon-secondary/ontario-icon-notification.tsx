import { Component, Prop, h } from '@stencil/core';
import notification from './assets/ontario-icon-notification.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-notification',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconNotification {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={notification} />;
  }
};
