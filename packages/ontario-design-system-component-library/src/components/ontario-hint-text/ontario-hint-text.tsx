import { Component, Prop, Element, h } from '@stencil/core';

/**
 * Ontario Design System hint text web component
 */
@Component({
  tag: 'ontario-hint-text',
  styleUrl: 'ontario-hint-text.scss',
  shadow: true,
})
export class OntarioHintText {
  @Element() host: HTMLElement;

  /**
   * Text to display as the hint text statement
    *
    * @example
    * <ontario-hint-text hint="Hint Text"></ontario-button>
      *
      * The resulting hint text will display `"Hint Text"`.
    */
  @Prop() hint: string | null;

  /**
   * Used to used to establish a relationship between hint text content and elements using aria-describedby.
   */
  @Prop({ attribute: 'id' }) hintId?: string | undefined;

  private getHintId() {
    return this.hintId ?? (this.hintId = this.host.id);
  }

  private getHintContent() {
    return this.hint ?? (this.hint = this.host.textContent);
  }

  render() {
    return (
      <p id={this.getHintId()} class="ontario-hint" aria-hint={this.getHintContent()}>
        {this.getHintContent()}
      </p>
    );
  }
}
