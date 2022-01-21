import { Component, Prop, h } from '@stencil/core';
import liveChat from './assets/ontario-icon-live-chat.svg';

@Component({
  tag: 'ontario-icon-live-chat',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class OntarioIconLiveChat {

  @Prop() colour: "black" | "blue" | "grey";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={liveChat} />;
  }
};
