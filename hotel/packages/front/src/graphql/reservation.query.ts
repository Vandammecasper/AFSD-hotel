import gql from 'graphql-tag'

export const GET_ALL_RESERVATIONS = gql`
    query{
        reservations{
            id
            roomId
            reservationName
            customerIds
            checkInDate
            checkOutDate
            checkedIn
            price
        }
    }
`

export const GET_RESERVATION_BY_ID = gql`
    query($id: String!){
        reservation(id: $id){
            id
            roomId
            reservationName
            customerIds
            checkInDate
            checkOutDate
            checkedIn
            price
        }  
    }
`

export const GET_RESERVATIONS_BY_CUSTOMER_ID = gql`
    query($uid: String!){
        reservationsByCustomerId(uid: $uid){
            id
            roomId
            reservationName
            customerIds
            checkInDate
            checkOutDate
            checkedIn
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
            checkedIn
            price
        }  
    }
`

export const GET_NOT_CHECKED_IN_RESERVATIONS_OF_TODAY = gql`
    query{
        notCheckedInReservationsOfToday{
            id
            roomId
            reservationName
            customerIds
            checkInDate
            checkOutDate
            checkedIn
            price
        }  
    }
`