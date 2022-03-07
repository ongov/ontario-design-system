import { Component, Prop, h } from '@stencil/core';
import liveChat from './assets/ontario-icon-live-chat.svg';

@Component({
  tag: 'ontario-icon-live-chat',
  styleUrl: 'ontario-icon.scss',
  shadow: true,
})

export class OntarioIconLiveChat {

  @Prop() colour: "black" | "blue" | "grey" = "black";

  render() {
    return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={liveChat} />;
  }
};
