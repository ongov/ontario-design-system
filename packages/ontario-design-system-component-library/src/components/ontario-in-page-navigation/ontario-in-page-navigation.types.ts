export interface NavigationItem {
	title: string;
	href?: string;
	customHandler?: (event: MouseEvent) => void;
}
