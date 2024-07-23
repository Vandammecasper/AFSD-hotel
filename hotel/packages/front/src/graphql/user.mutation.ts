import gql from 'graphql-tag'

export const ADD_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      uid
      userName
      email
      admin
      rooms
    }
  }
`

export const UPDATE_USER_ROLE = gql`
  mutation updateRole($id: String!, $admin: Boolean!) {
    updateRole(id: $id, admin: $admin) {
      id
      uid
      userName
      email
      admin
      rooms
    }
  }
`
