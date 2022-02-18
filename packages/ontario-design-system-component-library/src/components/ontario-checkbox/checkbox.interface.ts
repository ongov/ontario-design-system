import { Base } from '../../utils/common.interface';
import { CheckboxOption } from './checkboxoption.interface';

export interface Checkbox extends Base {
  /**
   * The legend for the checkbox
   */
  legend: string;

  /**
   * Define hint text on an element.
   */
  hintText?: string;

  /**
   * If there are multiple inputs in a fieldset, display each input as an option
   */
  options: string | CheckboxOption[];

  internalOptions: CheckboxOption[]

  /**
   * Used to define whether the input field is required or not. If required, the value passed should be 'required'.
   */
  required?: "required" | "optional";

}
