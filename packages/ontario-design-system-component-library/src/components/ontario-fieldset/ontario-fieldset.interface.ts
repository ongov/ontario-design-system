import { CaptionType } from '../../utils/common/input-caption/input-caption.types';

export interface Fieldset {
	/**
	 * The text value used for the legend of the fieldset.
	 */
	legend: string;

	/**
	 * The size of the fieldset legend. If no prop is passed, it will be to `default`.
	 */
	legendSize: CaptionType;
}
