import gql from 'graphql-tag'

export const GET_ALL_RESERVATIONS = gql`
    query{
        reservations{
            id
            reservationName
            customerIds
            checkInDate
            checkOutDate
        }
    }
`

export const GET_RESERVATION_BY_ID = gql`
    query($id: String!){
        reservation(id: $id){
            reservationName
            customerIds
            checkInDate
            checkOutDate
        }  
    }
`

export const GET_RESERVATIONS_BY_CUSTOMER_ID = gql`
    query($customerId: String!){
        reservationsByCustomerId(customerId: $customerId){
            id
            roomId
            reservationName
            customerIds
            checkInDate
            checkOutDate
            price
        }  
    }
`

export const GET_RESERVATIONS_BY_ROOM_ID = gql`
    query($roomId: String!){
        reservationsByRoomId(roomId: $roomId){
            id
            roomId
            reservationName
            customerIds
            checkInDate
            checkOutDate
            price
        }  
    }
`