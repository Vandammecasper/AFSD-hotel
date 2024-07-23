export interface CustomUser {
    id: string
    uid: string
    name: string
    email: string
    admin: boolean
    rooms?: string[]
}