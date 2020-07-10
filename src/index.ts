import { GraphQLServer, PubSub } from 'graphql-yoga';
import { PrismaClient } from '@prisma/client';
import resolvers from './resolvers';
import { IContext } from './utils';

const prisma = new PrismaClient();
const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schemas/schema.graphql',
  resolvers: {
    ...(resolvers as any),
  },
  context: (request): IContext => {
    return {
      ...request,
      prisma,
      pubsub,
    };
  },
});

server.start(() => console.log('Server is running on http://localhost:4000'));
