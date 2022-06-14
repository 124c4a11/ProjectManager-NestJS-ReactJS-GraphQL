import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
  mutation createProject(
    $name: String!
    $description: String!
    $status: ProjectStatus!
    $clientId: ID!
  ) {
    createProject(
      createProjectInput: {
        name: $name
        description: $description
        status: $status
        clientId: $clientId
      }
    ) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
      name
    }
  }
`;
