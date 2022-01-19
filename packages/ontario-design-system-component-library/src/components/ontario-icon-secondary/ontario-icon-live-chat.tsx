import { Component, Prop, h } from '@stencil/core';
import liveChat from './assets/ontario-icon-live-chat.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-live-chat',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconLiveChat {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={liveChat} />;
  }
};
