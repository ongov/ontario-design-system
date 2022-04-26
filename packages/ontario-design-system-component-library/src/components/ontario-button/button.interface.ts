import { Base } from '../../utils/common.interface';
import { ButtonType } from './ontario-button.enum';


export interface OntarioButtonProperties extends Base {
  /**
   * The type of button to render.
   */
  type?: ButtonType;

  /**
   * The native HTML button type the button should use.
   */
  htmlType?: 'button' | 'reset' | 'submit';

  /**
   * Text to be displayed within the button. This will override the text provided through the Element Content.
   *
   * @example
   * <ontario-button label="Label Text">Text</ontario-button>
   *
   * The resulting button will have the label `"Label Text"`.
   */
  label?: string;

  /**
   * Provides more context as to what the button interaction is doing.
   *
   * @example
   * <ontario-button aria-label="Click button to open map">Open</ontario button>
   */
  ariaLabel?: string;

  /**
   * The unique identifier of the button
   */
  elementId?: string;
}
