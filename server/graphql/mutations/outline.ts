import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import {
    createOutlineResolver,
    deleteOutlineResolver,
    updateOutlineResolver,
} from "../resolvers/outline";
import { OutlineType } from "../typeDefs/Outline";

export const createOutlineMutation = {
    type: OutlineType,
    description:
        "Creates a new outline in the magic system with a matching ID, belonging to the user with a matching ID",
    args: {
        ownerId: { type: GraphQLNonNull(GraphQLID) },
        magicSystemId: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        type: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_parent: any, args: any) => {
        return createOutlineResolver(args);
    },
};

export const updateOutlineMutation = {
    type: OutlineType,
    description: "Updates an Outline with the incoming body and name",
    args: {
        ownerId: { type: GraphQLNonNull(GraphQLID) },
        magicSystemId: { type: GraphQLNonNull(GraphQLID) },
        outlineId: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        body: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_parent: any, args: any) => {
        return updateOutlineResolver(args);
    },
};

export const deleteOutlineMutation = {
    type: GraphQLString,
    description: "Deletes an Outline with the incoming outline id",
    args: {
        ownerId: { type: GraphQLNonNull(GraphQLID) },
        magicSystemId: { type: GraphQLNonNull(GraphQLString) },
        outlineId: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_parent: any, args: any) => {
        return deleteOutlineResolver(args);
    },
};
