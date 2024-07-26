import gql from 'graphql-tag'

export const GET_ALL_LOCKS = gql`
    query{
        locks{
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

export const GET_LOCK_BY_ID = gql`
    query($id: String!){
        lock(id: $id){
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