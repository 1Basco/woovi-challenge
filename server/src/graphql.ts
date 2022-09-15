import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
} from "graphql";

import {
  globalIdField,
  connectionDefinitions,
  connectionFromArray,
  connectionArgs,
  mutationWithClientMutationId,
} from "graphql-relay";

import { NodeField, NodeInterface, NodesField } from "./NodeInterface";
import { IUser } from "./types";
import { users } from "./utils";

export const UserType: GraphQLObjectType = new GraphQLObjectType<IUser>({
  name: "User",
  description: "User",
  fields: () => ({
    id: globalIdField("User"),
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ name }) => name,
    },
  }),

  interfaces: () => [NodeInterface],
});

export const UserConnection = connectionDefinitions({
  name: "User",
  nodeType: UserType,
});

export const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "The root of all... queries",
  fields: () => ({
    node: NodeField,
    nodes: NodesField,
    users: {
      type: new GraphQLNonNull(UserConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: (_, args) => connectionFromArray(users, args),
    },
  }),
});

const UserCreate = mutationWithClientMutationId({
  name: "UserCreate",
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ name }) => {
    const newUser = { name };
    users.push(newUser);
    return {
      message: "Success",
      error: null,
    };
  },
  outputFields: {
    message: {
      type: GraphQLString,
      resolve: ({ message }) => message,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});

export const MutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "MutationType",
  fields: () => ({
    UserCreate,
  }),
});
