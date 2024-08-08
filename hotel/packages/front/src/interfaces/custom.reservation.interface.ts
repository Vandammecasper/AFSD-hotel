export interface CustomReservation {
    id: string
    reservationName: string
    roomId: string
    customerIds: [string]
    checkInDate: string
    checkOutDate: string
    guests: number
    price: number
    createdAt: string
    checkedIn: boolean
}