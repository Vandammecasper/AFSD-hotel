import gql from 'graphql-tag'

export const GET_ALL_USERS = gql`
  query {
      users{
        id,
        uid,
        userName,
        role
      }
    }
  `

export const GET_USER_BY_UID = gql`
query userByUid($uid: String!) {
  userByUid(uid: $uid) {
    id,
    uid,
    userName,
    role
  }
}
`
