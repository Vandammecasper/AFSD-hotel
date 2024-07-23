export interface CustomRoom {
    id: string
    name: string
    number: number
    price: number
    maxOccupancy: number
    size: number
    facilities?: string[]
    image?: string
    description?: string
}