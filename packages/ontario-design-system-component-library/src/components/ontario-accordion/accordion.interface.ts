import { Base } from '../../utils/common/common.interface';

export interface Accordion extends Base {
	label: string;
	content: string[];
}
