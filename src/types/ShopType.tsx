export interface ShopItem {
    name: string;
    price: number;
    income: number;
    owned: number;
    img: string;
}
export const ShopItems: ShopItem[] = [
    {
        name: "Citizen",
        price: 10,
        income: 1,
        owned: 0,
        img: "/person.png"
    }
]