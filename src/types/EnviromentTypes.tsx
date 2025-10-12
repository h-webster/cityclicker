export interface Enviroment_Object {
    id: number;
    x: number;
    y: number;
    status: string;
    houseId?: number;
    taken?: boolean;
    targetX?: number;
    targetY?: number;
}