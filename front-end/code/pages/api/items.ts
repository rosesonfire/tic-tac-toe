import { NextApiHandler } from 'next';
import { gql } from '@apollo/client';

import graphQLClient from '@graphql';
import { Item } from '@feTypes/business/item';

const METHODS = {
  GET: 'GET',
};

const handler: NextApiHandler<Item[]> = (async (req, res) => {
  if (req.method === METHODS.GET) {
    const { data: { items } } = await graphQLClient.query<{ items: Item[] }>(gql`
      {
        items {
          id
          name
          category
          price
        }
      }
    `);

    res.status(200).json(items);
  }
});

export default handler;
