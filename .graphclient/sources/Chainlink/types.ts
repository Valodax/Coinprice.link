// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ChainlinkTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type DataFeed = {
  id: Scalars['Bytes'];
  name?: Maybe<Scalars['String']>;
  asset?: Maybe<Scalars['String']>;
  assetAddress: Scalars['Bytes'];
  denomination?: Maybe<Scalars['String']>;
  denominationAddress: Scalars['Bytes'];
  decimals?: Maybe<Scalars['Int']>;
  live: Scalars['Boolean'];
  phaseId: Scalars['Int'];
  timeCreated: Scalars['BigInt'];
  timeLastPrice?: Maybe<Scalars['BigInt']>;
  timeDeprecated?: Maybe<Scalars['BigInt']>;
  prices?: Maybe<Array<DataPoint>>;
};


export type DataFeedpricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DataPoint_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DataPoint_filter>;
};

export type DataFeed_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  assetAddress?: InputMaybe<Scalars['Bytes']>;
  assetAddress_not?: InputMaybe<Scalars['Bytes']>;
  assetAddress_gt?: InputMaybe<Scalars['Bytes']>;
  assetAddress_lt?: InputMaybe<Scalars['Bytes']>;
  assetAddress_gte?: InputMaybe<Scalars['Bytes']>;
  assetAddress_lte?: InputMaybe<Scalars['Bytes']>;
  assetAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  assetAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  assetAddress_contains?: InputMaybe<Scalars['Bytes']>;
  assetAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  denomination?: InputMaybe<Scalars['String']>;
  denomination_not?: InputMaybe<Scalars['String']>;
  denomination_gt?: InputMaybe<Scalars['String']>;
  denomination_lt?: InputMaybe<Scalars['String']>;
  denomination_gte?: InputMaybe<Scalars['String']>;
  denomination_lte?: InputMaybe<Scalars['String']>;
  denomination_in?: InputMaybe<Array<Scalars['String']>>;
  denomination_not_in?: InputMaybe<Array<Scalars['String']>>;
  denomination_contains?: InputMaybe<Scalars['String']>;
  denomination_contains_nocase?: InputMaybe<Scalars['String']>;
  denomination_not_contains?: InputMaybe<Scalars['String']>;
  denomination_not_contains_nocase?: InputMaybe<Scalars['String']>;
  denomination_starts_with?: InputMaybe<Scalars['String']>;
  denomination_starts_with_nocase?: InputMaybe<Scalars['String']>;
  denomination_not_starts_with?: InputMaybe<Scalars['String']>;
  denomination_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  denomination_ends_with?: InputMaybe<Scalars['String']>;
  denomination_ends_with_nocase?: InputMaybe<Scalars['String']>;
  denomination_not_ends_with?: InputMaybe<Scalars['String']>;
  denomination_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  denominationAddress?: InputMaybe<Scalars['Bytes']>;
  denominationAddress_not?: InputMaybe<Scalars['Bytes']>;
  denominationAddress_gt?: InputMaybe<Scalars['Bytes']>;
  denominationAddress_lt?: InputMaybe<Scalars['Bytes']>;
  denominationAddress_gte?: InputMaybe<Scalars['Bytes']>;
  denominationAddress_lte?: InputMaybe<Scalars['Bytes']>;
  denominationAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  denominationAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  denominationAddress_contains?: InputMaybe<Scalars['Bytes']>;
  denominationAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  decimals?: InputMaybe<Scalars['Int']>;
  decimals_not?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  live?: InputMaybe<Scalars['Boolean']>;
  live_not?: InputMaybe<Scalars['Boolean']>;
  live_in?: InputMaybe<Array<Scalars['Boolean']>>;
  live_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  phaseId?: InputMaybe<Scalars['Int']>;
  phaseId_not?: InputMaybe<Scalars['Int']>;
  phaseId_gt?: InputMaybe<Scalars['Int']>;
  phaseId_lt?: InputMaybe<Scalars['Int']>;
  phaseId_gte?: InputMaybe<Scalars['Int']>;
  phaseId_lte?: InputMaybe<Scalars['Int']>;
  phaseId_in?: InputMaybe<Array<Scalars['Int']>>;
  phaseId_not_in?: InputMaybe<Array<Scalars['Int']>>;
  timeCreated?: InputMaybe<Scalars['BigInt']>;
  timeCreated_not?: InputMaybe<Scalars['BigInt']>;
  timeCreated_gt?: InputMaybe<Scalars['BigInt']>;
  timeCreated_lt?: InputMaybe<Scalars['BigInt']>;
  timeCreated_gte?: InputMaybe<Scalars['BigInt']>;
  timeCreated_lte?: InputMaybe<Scalars['BigInt']>;
  timeCreated_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timeCreated_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timeLastPrice?: InputMaybe<Scalars['BigInt']>;
  timeLastPrice_not?: InputMaybe<Scalars['BigInt']>;
  timeLastPrice_gt?: InputMaybe<Scalars['BigInt']>;
  timeLastPrice_lt?: InputMaybe<Scalars['BigInt']>;
  timeLastPrice_gte?: InputMaybe<Scalars['BigInt']>;
  timeLastPrice_lte?: InputMaybe<Scalars['BigInt']>;
  timeLastPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timeLastPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timeDeprecated?: InputMaybe<Scalars['BigInt']>;
  timeDeprecated_not?: InputMaybe<Scalars['BigInt']>;
  timeDeprecated_gt?: InputMaybe<Scalars['BigInt']>;
  timeDeprecated_lt?: InputMaybe<Scalars['BigInt']>;
  timeDeprecated_gte?: InputMaybe<Scalars['BigInt']>;
  timeDeprecated_lte?: InputMaybe<Scalars['BigInt']>;
  timeDeprecated_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timeDeprecated_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  prices_?: InputMaybe<DataPoint_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DataFeed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<DataFeed_filter>>>;
};

export type DataFeed_orderBy =
  | 'id'
  | 'name'
  | 'asset'
  | 'assetAddress'
  | 'denomination'
  | 'denominationAddress'
  | 'decimals'
  | 'live'
  | 'phaseId'
  | 'timeCreated'
  | 'timeLastPrice'
  | 'timeDeprecated'
  | 'prices';

export type DataPoint = {
  id: Scalars['Bytes'];
  feed: DataFeed;
  price: Scalars['BigInt'];
  roundId: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
};

export type DataPoint_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  feed?: InputMaybe<Scalars['String']>;
  feed_not?: InputMaybe<Scalars['String']>;
  feed_gt?: InputMaybe<Scalars['String']>;
  feed_lt?: InputMaybe<Scalars['String']>;
  feed_gte?: InputMaybe<Scalars['String']>;
  feed_lte?: InputMaybe<Scalars['String']>;
  feed_in?: InputMaybe<Array<Scalars['String']>>;
  feed_not_in?: InputMaybe<Array<Scalars['String']>>;
  feed_contains?: InputMaybe<Scalars['String']>;
  feed_contains_nocase?: InputMaybe<Scalars['String']>;
  feed_not_contains?: InputMaybe<Scalars['String']>;
  feed_not_contains_nocase?: InputMaybe<Scalars['String']>;
  feed_starts_with?: InputMaybe<Scalars['String']>;
  feed_starts_with_nocase?: InputMaybe<Scalars['String']>;
  feed_not_starts_with?: InputMaybe<Scalars['String']>;
  feed_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  feed_ends_with?: InputMaybe<Scalars['String']>;
  feed_ends_with_nocase?: InputMaybe<Scalars['String']>;
  feed_not_ends_with?: InputMaybe<Scalars['String']>;
  feed_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  feed_?: InputMaybe<DataFeed_filter>;
  price?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  roundId?: InputMaybe<Scalars['BigInt']>;
  roundId_not?: InputMaybe<Scalars['BigInt']>;
  roundId_gt?: InputMaybe<Scalars['BigInt']>;
  roundId_lt?: InputMaybe<Scalars['BigInt']>;
  roundId_gte?: InputMaybe<Scalars['BigInt']>;
  roundId_lte?: InputMaybe<Scalars['BigInt']>;
  roundId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  roundId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DataPoint_filter>>>;
  or?: InputMaybe<Array<InputMaybe<DataPoint_filter>>>;
};

export type DataPoint_orderBy =
  | 'id'
  | 'feed'
  | 'feed__id'
  | 'feed__name'
  | 'feed__asset'
  | 'feed__assetAddress'
  | 'feed__denomination'
  | 'feed__denominationAddress'
  | 'feed__decimals'
  | 'feed__live'
  | 'feed__phaseId'
  | 'feed__timeCreated'
  | 'feed__timeLastPrice'
  | 'feed__timeDeprecated'
  | 'price'
  | 'roundId'
  | 'blockNumber'
  | 'blockTimestamp';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  dataFeed?: Maybe<DataFeed>;
  dataFeeds: Array<DataFeed>;
  dataPoint?: Maybe<DataPoint>;
  dataPoints: Array<DataPoint>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerydataFeedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydataFeedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DataFeed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DataFeed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydataPointArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydataPointsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DataPoint_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DataPoint_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  dataFeed?: Maybe<DataFeed>;
  dataFeeds: Array<DataFeed>;
  dataPoint?: Maybe<DataPoint>;
  dataPoints: Array<DataPoint>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptiondataFeedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondataFeedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DataFeed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DataFeed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondataPointArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondataPointsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DataPoint_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DataPoint_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  dataFeed: InContextSdkMethod<Query['dataFeed'], QuerydataFeedArgs, MeshContext>,
  /** null **/
  dataFeeds: InContextSdkMethod<Query['dataFeeds'], QuerydataFeedsArgs, MeshContext>,
  /** null **/
  dataPoint: InContextSdkMethod<Query['dataPoint'], QuerydataPointArgs, MeshContext>,
  /** null **/
  dataPoints: InContextSdkMethod<Query['dataPoints'], QuerydataPointsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  dataFeed: InContextSdkMethod<Subscription['dataFeed'], SubscriptiondataFeedArgs, MeshContext>,
  /** null **/
  dataFeeds: InContextSdkMethod<Subscription['dataFeeds'], SubscriptiondataFeedsArgs, MeshContext>,
  /** null **/
  dataPoint: InContextSdkMethod<Subscription['dataPoint'], SubscriptiondataPointArgs, MeshContext>,
  /** null **/
  dataPoints: InContextSdkMethod<Subscription['dataPoints'], SubscriptiondataPointsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["Chainlink"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
