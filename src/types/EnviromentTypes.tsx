export interface Enviroment_Object {
    id: number;
    x: number;
    y: number;
    status: string;
    waitTime: number;
    houseId?: number;
    taken?: boolean;
    targetX?: number;
    targetY?: number;
}