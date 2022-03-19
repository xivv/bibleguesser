export interface Book {
    name: string;
    cap: Cap[];
}
export interface Cap {
    numb: number;
    vers: Vers[]
}
export interface Vers {
    numb: number;
    text: string;
}