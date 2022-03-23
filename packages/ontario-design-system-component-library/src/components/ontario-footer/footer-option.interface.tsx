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
        content: [{
            title: string;
            link: string;
        }];
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

// export interface ExpandedOptions {}

// can use ? in ontario-footer.tsx so if no value is entered it just returns undefined: part 2 of https://www.freecodecamp.org/news/how-the-question-mark-works-in-javascript/

