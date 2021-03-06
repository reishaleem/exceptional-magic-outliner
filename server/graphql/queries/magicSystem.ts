import { GraphQLID, GraphQLList } from "graphql";
import {
    magicSystemResolver,
    magicSystemsResolver,
} from "../resolvers/magicSystem";
import { MagicSystemType } from "../typeDefs/MagicSystem";

export const getAllMagicSystemsQuery = {
    type: GraphQLList(MagicSystemType),
    description: "A list of all Magic Systems",
    resolve: (_parent: any, _args: any) => {
        return magicSystemsResolver();
    },
};

export const getMagicSystemQuery = {
    type: MagicSystemType,
    description: "A single matching system that has a matching ID",
    args: {
        ownerId: { type: GraphQLID },
        magicSystemId: { type: GraphQLID },
    },
    resolve: (_parent: any, args: any) => {
        return magicSystemResolver(args);
    },
};
