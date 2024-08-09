export interface CustomUser {
    id: string
    uid: string
    userName: string
    email: string
    admin: boolean
    rooms?: string[]
}