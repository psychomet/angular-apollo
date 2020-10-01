import gql from "graphql-tag";

export interface PostContext {
  id: string,
  title: string,
  __typename: string
}


export const findAllPost = gql`
    query (
        $options: PageQueryOptions
    ) {
        posts(options: $options) {
            data {
                id
                title
            }
            meta {
                totalCount
            }
        }
    }
`;

export const createPost = gql`
    mutation ($input: CreatePostInput!) {
        createPost(input: $input) {
            id
            title
            body
        }
    }
`;

export const updatePost = gql`
    mutation (
        $id: ID!,
        $input: UpdatePostInput!
    ) {
        updatePost(id: $id, input: $input) {
            id
            title
            body
        }
    }
`;

export const findOnePost = (id) => {
  return gql`
      query {
          post(id: ${id}) {
              id
              title
              body
          }
      }
  `
};

export const deletePost = gql`
    mutation (
        $id: ID!
    ) {
        deletePost(id: $id)
    }
`;
