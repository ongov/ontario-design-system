import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';

export interface CheckboxOption {

  /**
   * The name for the checkbox (note that to group checkboxes to the same question, the name must be the same)
   */
  name: string;

  /**
    * The text to display as label. This will override the text provided through the Element Content.
    *
    * @example
    * <ontario-checkbox name="checkbox-name" checkbox-label="checkbox label">This is a checkbox label</ontario-label>
    *
    * The resulting label will show `"checkbox label"`.
    */
  label: string;

  /**
  * Used to define hint text on element'.
  */
  hintText?: string;

  // This boolean can be replaced and implied by whether the hintExpander object is null/undefined and has a length > 0.
  // The team needs to decide which pattern to use and make it a standard to follow throughout for consistency.
  // This is being added in now to match what's being passed into the options object through the HTML sample.
  isHintExpander?: boolean;

  /**
    * Used to define whether the hint expander component is required or not. If required, the value passed should be 'true'.
    */
  hintExpander?: HintExpander;

  /**
    * The checkbox content value
    */
  value: string;

  handleChange: ((event: Event) => void) | undefined;

}
