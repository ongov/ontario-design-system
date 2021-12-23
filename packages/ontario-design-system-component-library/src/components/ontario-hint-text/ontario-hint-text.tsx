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
   * Text to display as the hint text statement.
   *
   * Setting the hint can be done using the element content or setting the
   * this property.  This property will take precedence.
   *
   * @example
   * <ontario-hint-text hint="Override Hint Text">Hint Text</ontario-button>
   *
   * The resulting hint text will display `"Override Hint Text"`.
   */
  @Prop({ mutable: true }) hint: string | null;

  /**
   * Used to used to establish a relationship between hint text content and elements using aria-describedby.
   */
  @Prop({ attribute: 'id' }) hintId?: string | undefined;

  /**
   * Set `hint` using internal component logic
   */
  componentWillLoad() {
    this.hint = this.hint ?? this.host.textContent;
  }

  render() {
    return (
      <p id={this.hintId} class="ontario-hint" aria-hint={this.hint}>
        {this.hint}
      </p>
    );
  }
}
