import { TwoColumnOptions, ThreeColumnOptions } from '../ontario-footer-interface';

export const isInvalidTwoColumnOptions = (options: TwoColumnOptions): boolean => {
	return !options || !options.col1?.title || !options.col1?.content || !options.col2?.title || !options.col2?.content;
};

export const isInvalidThreeColumnOptions = (options: ThreeColumnOptions): boolean => {
	return (
		!options ||
		!options.col1?.title ||
		!options.col1?.content ||
		!options.col2?.title ||
		!options.col2?.content ||
		!options.col3?.title ||
		!options.col3?.content
	);
};
