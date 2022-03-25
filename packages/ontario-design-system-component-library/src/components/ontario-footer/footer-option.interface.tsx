export interface defaultOptions {
	accessibilityLink: string;
	privacyLink: string;
	contactLink: string;
	queensPrinterLink: string;
	
}

export interface expandedTwoColumnOptions {
    firstColumn: {
        title: string;
        content: string;
    };
    secondColumn: {
        title: string;
        content: string;
        contactButtonText: string;
    }
}

export interface expandedThreeColumnOptions {
    firstColumn: {
        title: string;
        content: string;
    };
    secondColumn: {
        title: string;
        content: threeColumnRowTwoContent[];
    };
    thirdColumn: {
        title: string;
        content: string;
        facebook?: {
            link: string;
        };
        twitter?: {
            link: string;
        };
        instagram?: {
            link: string;
        };
        youtube?: {
            link: string;
        };
    }
}

interface threeColumnRowTwoContent {
    title:string;
    link:string;
}