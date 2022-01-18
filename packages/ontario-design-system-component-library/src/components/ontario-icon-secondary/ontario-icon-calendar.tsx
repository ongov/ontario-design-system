import { Component, Prop, h } from '@stencil/core';
import calendar from './assets/ontario-icon-calendar.svg';

/** @internal **/
@Component({
  tag: 'ontario-icon-calendar',
  styleUrl: 'ontario-icon-secondary.scss',
  shadow: false,
})

export class ontarioIconCalendar {

  @Prop() color: string;

  render() {
    return <div class={`ontario-icon ontario-icon--${this.color}`} innerHTML={calendar} />;
  }
};
