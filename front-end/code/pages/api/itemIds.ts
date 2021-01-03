import { NextApiHandler } from 'next';
import { gql } from '@apollo/client';

import GraphQLClient from '@utils/graphql';
import { Item, ItemId } from '@feTypes/business/item';

const METHODS = {
  GET: 'GET',
};

const handler: NextApiHandler<ItemId[]> = (async (req, res) => {
  if (req.method === METHODS.GET) {
    const { q } = req.query;

    const { data: { items } } = await GraphQLClient.get<{ items: Item[] }>(gql`
      {
        items(q: "${q}") {
          id
        }
      }
    `);

    res.status(200).json(items.map(({ id }) => id));
  }
});

export default handler;
