import gql from 'graphql-tag'

export const CREATE_ROOM = gql`
    mutation createRoom ($createRoomInput: CreateRoomInput!) {
        createRoom(createRoomInput: $createRoomInput) {
            isLocked
            lockHistory {
                isLocked
                customerId
                time
            }
            id
            roomName
            price
            size
            facilities
            roomPicture
        }
    }
`

export const UPDATE_ROOM = gql`
    mutation updateRoom ($updateRoomInput: UpdateRoomInput!) {
        updateRoom(updateRoomInput: $updateRoomInput) {
            isLocked
            lockHistory {
                isLocked
                customerId
                time
            }
            id
            roomName
            roomNumber
            price
            size
            facilities
            roomPicture
        }
    }
`

export const DELETE_ROOM = gql`
    mutation removeRoom ($id: String!) {
        removeRoom(id: $id) {
            id
            roomName
            roomNumber
            price
            size
            facilities
            roomPicture
        }
    }
`