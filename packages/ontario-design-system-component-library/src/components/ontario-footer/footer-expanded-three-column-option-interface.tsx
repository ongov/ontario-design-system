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