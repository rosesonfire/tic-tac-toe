import { NextApiHandler } from 'next';
import { gql } from '@apollo/client';

import { Post } from '@feTypes/business/post';
import graphQLClient from '@graphql';

const METHODS = {
  GET: 'GET',
};

const handler: NextApiHandler<Post[]> = (async (req, res) => {
  if (req.method === METHODS.GET) {
    const { data: { posts } } = await graphQLClient.query<{ posts: Post[] }>(gql`
      {
        posts {
          id
          title
        }
      }
    `);

    res.status(200).json(posts);
  }
});

export default handler;
