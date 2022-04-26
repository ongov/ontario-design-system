export interface ExpandedThreeColumnOptions {
    firstColumn: {
        title: string;
        content: string;
    };
    secondColumn: {
        title: string;
        content: ThreeColumnRowTwoContent[];
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

interface ThreeColumnRowTwoContent {
    title:string;
    link:string;
}