export interface Book {
    name: string;
    cap: Cap[];
    order: number;
}
export interface Cap {
    numb: number;
    verses: Vers[]
}
export interface Vers {
    numb: number;
    vers: string;
}

export interface Bible {
    totalVerses: number;
    totalCap: number;
    books: Book[];
}