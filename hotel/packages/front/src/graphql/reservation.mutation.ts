import gql from 'graphql-tag'

export const CREATE_RESERVATION = gql`
    mutation createReservation($createReservationInput: CreateReservationInput!){
        createReservation(
            createReservationInput: $createReservationInput
        ) {
            id
            reservationName
            customerIds
            checkInDate
            checkOutDate
        }
    }
`

export const UPDATE_RESERVATION = gql`
    mutation updateReservation($updateReservationInput: UpdateReservationInput!){
        updateReservation(
            updateReservationInput: $updateReservationInput
        ) {
            id
            reservationName
            customerIds
            checkInDate
            checkOutDate
        }
    }
`

export const REMOVE_RESERVATION = gql`
    mutation removeReservation($id: String!){
        removeReservation(id: $id){
            id
            reservationName
            customerIds
            checkInDate
            checkOutDate
        }
    }
`