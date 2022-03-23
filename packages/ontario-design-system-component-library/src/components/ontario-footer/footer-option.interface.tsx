export interface defaultOptions {
	accessibilityLink: string;
	privacyLink: string;
	contactLink: string;
	queensPrinterLink: string;
	
}

export interface expandedTwoColumnOptions {
    firstColumn: {
        title: string;
        body: string;
        extraContent?: string;
    };
    secondColumn: {
        title: string;
        body: string;
        extraContent?: string;
        contactButtonText: string;
    }
}

// export interface ExpandedOptions {}

// can use ? in ontario-footer.tsx so if no value is entered it just returns undefined: part 2 of https://www.freecodecamp.org/news/how-the-question-mark-works-in-javascript/

