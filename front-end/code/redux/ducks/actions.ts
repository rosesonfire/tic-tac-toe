import { createAction } from '@reduxjs/toolkit';
// import { ItemId } from '@feTypes/business/item';

enum ActionType {
  INITIATE_SEARCH = 'INITIATE_SEARCH',
  COMPLETE_SEARCH = 'COMPLETE_SEARCH',
}

// eslint-disable-next-line import/prefer-default-export
export class ActionFactory {
  // static completeSearch = createAction(
  //   ActionType.COMPLETE_SEARCH,
  //   (searchText: string, itemIds: ItemId[]) => ({
  //     payload: {
  //       itemIds,
  //       searchText,
  //     },
  //   }),
  // );

  static initiateSearch = createAction(
    ActionType.INITIATE_SEARCH,
    (searchText: string, url: string) => ({
      payload: {
        searchText,
        url,
      },
    }),
  );
}
