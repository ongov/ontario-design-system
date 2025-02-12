export interface MenuItem {
	title: string;
	href: string;
	linkIsActive?: boolean;
	onClickHandler?: (event: Event) => void;
}
