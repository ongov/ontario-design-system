import { Component, Element, Event, EventEmitter, h, Prop } from '@stencil/core';
import { v4 as uuid } from 'uuid';

/**
 * Ontario Design System hint expander web component
 */
@Component({
  tag: 'ontario-hint-expander',
  styleUrl: 'ontario-hint-expander.scss',
  shadow: true,
})

export class OntarioHintExpander {
  @Element() host: HTMLElement;

  /**
   * Text to display as the hint expander question/statement
   */
  @Prop({ mutable: true }) hint: string;

  /**
   * Content to display as the hint, once the expander is toggled open
   */
  @Prop({ mutable: true }) content: string;

  /**
   * Include visually hidden text inside the label that describes to screen readers the availability of a hint expander
   */
  @Prop({ mutable: true }) ariaLabel?: string | null;

  /**
   * Used to used to establish a relationship between hint text content and elements using aria-describedby.
   */
  @Prop({ mutable: true }) hintExpanderId?: string;

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() toggleExpanderEvent!: EventEmitter<MouseEvent>;


  private onClick = (ev: Event) => {
    const hintExpander = ev.target as HTMLButtonElement | null;
    const hintExpanderParent = hintExpander?.parentElement;

    hintExpanderParent?.classList.toggle("ontario-expander--active");
    let content = hintExpanderParent?.querySelector(
      "[data-toggle='ontario-expander-content']"
    );
    content?.classList.toggle("ontario-expander__content--opened");
    content?.classList.contains("ontario-expander__content--opened")
      ? content.setAttribute("aria-hidden", "false")
      : content?.setAttribute("aria-hidden", "true");
    hintExpanderParent?.classList.contains("ontario-expander--active")
      ? hintExpanderParent?.setAttribute("aria-expanded", "true")
      : hintExpanderParent?.setAttribute("aria-expanded", "false");

    this.toggleExpanderEvent.emit(ev as MouseEvent);
  };

  /**
   * Set `hint` using internal component logic
   */
  componentWillLoad() {
    this.ariaLabel = this.ariaLabel ?? (this.ariaLabel = this.hint);
    this.content = this.content ?? this.host.textContent;
    this.hintExpanderId = this.hintExpanderId ?? uuid();
  }

  public getId(): string {
    return this.hintExpanderId ?? '';
  }

  render() {
    return (
      <div class="ontario-hint-expander__container">
        <button class="ontario-hint-expander__button" onClick={this.onClick} id="hint-expander-button-{this.hintExpanderId}" aria-controls="hint-expander-content-{this.hintExpanderId}" aria-expanded="false" data-toggle="ontario-collapse">
          <span class="ontario-hint-expander__button-icon--close"></span>
          <span class="ontario-hint-expander__button-icon--open">Open Icon</span>
          {this.hint}
        </button>
        <div class="ontario-hint-expander__content" id="hint-expander-content-{this.hintExpanderId}" aria-labelledby="hint-expander-button-id-{this.hintExpanderId}" aria-hidden="true" data-toggle="ontario-expander-content">
          {this.content}
        </div>
      </div>
    );
  }
}
