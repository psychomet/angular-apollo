import gql from "graphql-tag";

export interface PostContext {
  id: string,
  title: string,
  __typename: string
}


export const findAllPost = gql`
    query {
        cats{
            id
            name
            age
            breed
        }
    }
`;

export const createPost = gql`
    mutation ($input: CatInput!) {
        createCat(input: $input) {
            id
            name
            age
            breed
        }
    }
`;

export const updatePost = gql`
    mutation (
        $id: String!,
        $input: CatInput!
    ) {
        updateCat(id: $id, input: $input) {
            id
            name
            age
            breed
        }
    }
`;

export const findOnePost = (id: string) => {
  return gql`
      query {
          cat(id: "${id}") {
              id
              name
              age
              breed
          }
      }
  `
};

export const deletePost = gql`
    mutation (
        $id: String!
    ) {
        deleteCat(id: $id){
            id
            name
            age
            breed
        }
    }
`;
