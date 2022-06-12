import { gql } from '@apollo/client';

export const CREATE_CLIENT = gql`
  mutation createClient($name: String!, $email: String!, $phone: String!) {
    createClient(
      createClientInput: { name: $name, email: $email, phone: $phone }
    ) {
      id
      name
      email
      phone
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;
