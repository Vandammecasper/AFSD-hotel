export interface CustomReservation {
    id: string
    roomId: string
    userId: string
    checkIn: string
    checkOut: string
    guests: number
    totalPrice: number
    createdAt: string
}