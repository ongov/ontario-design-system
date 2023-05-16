import { TwoColumnOptions, ThreeColumnOptions } from '../ontario-footer-interface';

export const isInvalidTwoColumnOptions = (options: TwoColumnOptions): boolean => {
	return (
		!options ||
		!options.column1?.title ||
		!options.column1?.content ||
		!options.column2?.title ||
		!options.column2?.content
	);
};

export const isInvalidThreeColumnOptions = (options: ThreeColumnOptions): boolean => {
	return (
		!options ||
		!options.column1?.title ||
		!options.column1?.content ||
		!options.column2?.title ||
		!options.column2?.content ||
		!options.column3?.title ||
		!options.column3?.content
	);
};
