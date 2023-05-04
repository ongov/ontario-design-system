import { Base } from '../../utils/common.interface';
import { RadioOption } from './radio-option.interface';
import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';
import { Caption } from '../../utils/input-caption/caption.interface';

export interface RadioButtons extends Base {
	/**
	 * The text to display for the radio button legend.
	 *
	 * @example
	 * <ontario-radio-buttons
	 *   caption='{
	 *     "captionText": "Radio legend",
	 *     "captionType": "heading",
	 *   }
	 *   ...>
	 * </ontario-radio-buttons>
	 */
	caption: Caption | string;

	/**
	 * The name assigned to the radio button.
	 * The name value is used to reference form data after a form is submitted.
	 */
	name: string;

	/**
	 * Used to include the ontario-hint-text component for radio button group.
	 * This is optional.
	 */
	hintText?: string;

	/**
	 * Used to include the ontario-hint-expander component for the radio button group.
	 * This is passed in as an object with key-value pairs.
	 * This is optional.
	 *
	 * @example
	 * <ontario-radio-buttons
	 *   caption='{
	 *     "captionText": "Radio legend",
	 *     "captionType": "heading",
	 *   }'
	 * 	 name="radios"
	 *   options='[
	 * 	   {
	 *        "value": "radio-option-1",
	 * 		  "elementId": "radio-1",
	 *        "label": "Radio option 1 label",
	 *        "hintExpander": {
	 *			  "hint": "Hint expander for radio option 1",
	 * 		      "content": "Example hint expander content for radio option 1."
	 *		  }
	 *     }
	 *   ]'
	 *   hint-expander='{
	 *     "hint": "Hint expander for the radio button group",
	 *     "content": "Example hint expander content for the radio button group."
	 *   }'
	 *   required="true"
	 * >
	 * </ontario-radio-buttons>
	 */
	hintExpander?: HintExpander | string;

	/**
	 * This is used to determine whether the radio button is required or not.
	 * This prop also gets passed to the InputCaption utility to display either an optional or required flag in the label.
	 * If no prop is set, it will default to false (optional).
	 */
	required?: boolean;

	/**
	 * Each property will be passed in through an object in the options array.
	 * This can either be passed in as an object directly (if using react), or as a string in HTML.
	 * If there are multiple radio buttons in a fieldset, each radio button will be displayed as an option.
	 * In the example below, the options are being passed in as a string and there are two radio buttons to be displayed in the fieldset.
	 *
	 * @example
	 * <ontario-radio-buttons
	 *   caption='{
	 *     "captionText": "Radio legend",
	 *     "captionType": "heading",
	 *   }'
	 *   name="radios"
	 *   hint-text="Hint text for the radio button group."
	 *   options='[
	 *     {
	 *        "value": "radio-option-1",
	 * 		  "elementId": "radio-1",
	 *        "label": "Radio option 1 label"
	 *     },
	 *     {
	 *        "value": "radio-option-2",
	 * 		  "elementId": "radio-2",
	 *        "label": "Radio option 2 label",
	 *        "hintExpander": {
	 *			  "hint": "Hint expander for radio option 2",
	 * 		      "content": "Example hint expander content for radio option 2."
	 *		  }
	 *      }
	 *   ]'
	 *   required="true"
	 * >
	 * </ontario-radio-buttons>
	 */
	options: string | RadioOption[];
}
