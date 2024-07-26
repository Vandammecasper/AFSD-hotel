import gql from 'graphql-tag'

export const GET_ALL_ROOMS = gql`
    query{
        rooms{
            id
            roomName
            roomNumber
            price
            maxOccupation
            size
            facilities
            description
            roomPicture
        }
    }
`

export const GET_ROOM_BY_ID = gql`
    query($id: String!){
        room(id: $id){
            roomName
            roomNumber
            price
            maxOccupation
            size
            facilities
            description
            roomPicture
        }  
    }
`