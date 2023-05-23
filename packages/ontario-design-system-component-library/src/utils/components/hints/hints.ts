import { Hint } from '../../common/common.interface';

export const constructHintTextObject = (hintText: string | Hint) => {
	let hintTextObject: Hint = { hint: '', hintContentType: 'string' };

	if (hintText) {
		if (typeof hintText === 'string') {
			try {
				hintTextObject = JSON.parse(hintText) as Hint;
			} catch {
				hintTextObject = { hint: hintText, hintContentType: 'string' };
			}
		} else {
			hintTextObject = hintText;
		}
	}

	return hintTextObject;
};
