export interface ShopItem {
    name: string;
    price: number;
    income: number;
    owned: number;
    img: string;
    priceIncrease: number;
}
export const ShopItems: ShopItem[] = [
    {
        name: "Citizen",
        price: 10,
        income: 1,
        owned: 0,
        img: "/person.png",
        priceIncrease: 1.15
    },
    {
        name: "House",
        price: 100,
        income: 5,
        owned: 0,
        img: "/house.png",
        priceIncrease: 1.15
    }
]