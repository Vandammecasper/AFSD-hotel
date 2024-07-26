import gql from 'graphql-tag'

export const CREATE_LOCK = gql`
    mutation createLock($createLockInput:CreateLockInput!){
        createLock(
            createLockInput: $createLockInput
        ) {
            id
            roomId
            isLocked
        }
    }
`

export const CHANGE_LOCK = gql`
    mutation updateLock($updateLockInput:UpdateLockInput!){
        updateLock(
            updateLockInput: $updateLockInput
        ) {
            id
            roomId
            isLocked
            lockHistory{
                customerId
                roomId
                isLocked
                time
            }
        }
    }
`