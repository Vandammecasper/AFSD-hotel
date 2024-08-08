import type { CustomLockChanges } from "./custom.lockChanges.interface"

export interface CustomRoom {
    id: string
    isLocked?: boolean
    lockHistory?: CustomLockChanges[]
    roomName?: string
    roomNumber?: number
    price?: number
    maxOccupation?: number
    size?: number
    facilities?: string[]
    image?: string
    description?: string
}