// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import AutoPaginationTransform from "@graphprotocol/client-auto-pagination";
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { ChainlinkTypes } from './sources/Chainlink/types';
import * as importedModule$0 from "./sources/Chainlink/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  DataFeed: ResolverTypeWrapper<DataFeed>;
  DataFeed_filter: DataFeed_filter;
  DataFeed_orderBy: DataFeed_orderBy;
  DataPoint: ResolverTypeWrapper<DataPoint>;
  DataPoint_filter: DataPoint_filter;
  DataPoint_orderBy: DataPoint_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']>;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  DataFeed: DataFeed;
  DataFeed_filter: DataFeed_filter;
  DataPoint: DataPoint;
  DataPoint_filter: DataPoint_filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Int8: Scalars['Int8'];
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type DataFeedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DataFeed'] = ResolversParentTypes['DataFeed']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  asset?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  assetAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  denomination?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  denominationAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  decimals?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  live?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  phaseId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timeCreated?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timeLastPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  timeDeprecated?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  prices?: Resolver<Maybe<Array<ResolversTypes['DataPoint']>>, ParentType, ContextType, RequireFields<DataFeedpricesArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DataPointResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DataPoint'] = ResolversParentTypes['DataPoint']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  feed?: Resolver<ResolversTypes['DataFeed'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  roundId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  dataFeed?: Resolver<Maybe<ResolversTypes['DataFeed']>, ParentType, ContextType, RequireFields<QuerydataFeedArgs, 'id' | 'subgraphError'>>;
  dataFeeds?: Resolver<Array<ResolversTypes['DataFeed']>, ParentType, ContextType, RequireFields<QuerydataFeedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  dataPoint?: Resolver<Maybe<ResolversTypes['DataPoint']>, ParentType, ContextType, RequireFields<QuerydataPointArgs, 'id' | 'subgraphError'>>;
  dataPoints?: Resolver<Array<ResolversTypes['DataPoint']>, ParentType, ContextType, RequireFields<QuerydataPointsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  dataFeed?: SubscriptionResolver<Maybe<ResolversTypes['DataFeed']>, "dataFeed", ParentType, ContextType, RequireFields<SubscriptiondataFeedArgs, 'id' | 'subgraphError'>>;
  dataFeeds?: SubscriptionResolver<Array<ResolversTypes['DataFeed']>, "dataFeeds", ParentType, ContextType, RequireFields<SubscriptiondataFeedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  dataPoint?: SubscriptionResolver<Maybe<ResolversTypes['DataPoint']>, "dataPoint", ParentType, ContextType, RequireFields<SubscriptiondataPointArgs, 'id' | 'subgraphError'>>;
  dataPoints?: SubscriptionResolver<Array<ResolversTypes['DataPoint']>, "dataPoints", ParentType, ContextType, RequireFields<SubscriptiondataPointsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  DataFeed?: DataFeedResolvers<ContextType>;
  DataPoint?: DataPointResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = ChainlinkTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/Chainlink/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const chainlinkTransforms = [];
const additionalTypeDefs = [] as any[];
const chainlinkHandler = new GraphqlHandler({
              name: "Chainlink",
              config: {"endpoint":"https://gateway.thegraph.com/api/{env.THE_GRAPH_API_KEY}/subgraphs/id/Fi4Vo18y9yZLVdCttcSie1yeKrUaTTQb5Ndz64ZnYvU9"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("Chainlink"),
              logger: logger.child("Chainlink"),
              importFn,
            });
chainlinkTransforms[0] = new AutoPaginationTransform({
                  apiName: "Chainlink",
                  config: {"validateSchema":true,"limitOfRecords":1000},
                  baseDir,
                  cache,
                  pubsub,
                  importFn,
                  logger,
                });
sources[0] = {
          name: 'Chainlink',
          handler: chainlinkHandler,
          transforms: chainlinkTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: GetAssetSpecificDocument,
        get rawSDL() {
          return printWithCache(GetAssetSpecificDocument);
        },
        location: 'GetAssetSpecificDocument.graphql'
      },{
        document: GetMainAllUsdDocument,
        get rawSDL() {
          return printWithCache(GetMainAllUsdDocument);
        },
        location: 'GetMainAllUsdDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type GetAssetSpecificQueryVariables = Exact<{
  asset: Scalars['String'];
  timeFilter: Scalars['BigInt'];
}>;


export type GetAssetSpecificQuery = { dataFeeds: Array<(
    Pick<DataFeed, 'id' | 'phaseId' | 'live' | 'decimals'>
    & { prices?: Maybe<Array<Pick<DataPoint, 'id' | 'price' | 'roundId' | 'blockTimestamp' | 'blockNumber'>>> }
  )> };

export type GetMainAllUsdQueryVariables = Exact<{
  timeFilter: Scalars['BigInt'];
}>;


export type GetMainAllUsdQuery = { dataFeeds: Array<(
    Pick<DataFeed, 'name' | 'id' | 'decimals' | 'asset' | 'assetAddress' | 'denomination' | 'denominationAddress'>
    & { prices?: Maybe<Array<Pick<DataPoint, 'price' | 'roundId' | 'blockTimestamp'>>> }
  )> };


export const GetAssetSpecificDocument = gql`
    query GetAssetSpecific($asset: String!, $timeFilter: BigInt!) {
  dataFeeds(first: 1000, where: {asset: $asset, denomination: "USD"}) {
    id
    phaseId
    live
    decimals
    prices(
      first: 2000
      orderBy: roundId
      orderDirection: asc
      where: {blockTimestamp_gte: $timeFilter}
    ) {
      id
      price
      roundId
      blockTimestamp
      blockNumber
    }
  }
}
    ` as unknown as DocumentNode<GetAssetSpecificQuery, GetAssetSpecificQueryVariables>;
export const GetMainAllUsdDocument = gql`
    query GetMainAllUsd($timeFilter: BigInt!) {
  dataFeeds(
    where: {live: true, denomination: "USD"}
    first: 300
    orderBy: name
    orderDirection: asc
  ) {
    name
    id
    decimals
    asset
    assetAddress
    denomination
    denominationAddress
    prices(
      where: {blockTimestamp_gte: $timeFilter}
      first: 500
      orderBy: blockTimestamp
      orderDirection: asc
    ) {
      price
      roundId
      blockTimestamp
    }
  }
}
    ` as unknown as DocumentNode<GetMainAllUsdQuery, GetMainAllUsdQueryVariables>;



export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    GetAssetSpecific(variables: GetAssetSpecificQueryVariables, options?: C): Promise<GetAssetSpecificQuery> {
      return requester<GetAssetSpecificQuery, GetAssetSpecificQueryVariables>(GetAssetSpecificDocument, variables, options) as Promise<GetAssetSpecificQuery>;
    },
    GetMainAllUsd(variables: GetMainAllUsdQueryVariables, options?: C): Promise<GetMainAllUsdQuery> {
      return requester<GetMainAllUsdQuery, GetMainAllUsdQueryVariables>(GetMainAllUsdDocument, variables, options) as Promise<GetMainAllUsdQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;