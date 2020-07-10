import { PrismaClient, User, LinkOrderByInput, Link } from '@prisma/client';
import { PubSub } from 'graphql-yoga';
import jwt from 'jsonwebtoken';

const APP_SECRET = 'USE-DOT-ENV';

const getUserId = (ctx: IContext): number => {
  const authorization = ctx.request.get('Authorization');
  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, APP_SECRET);
    return (payload as any).userId;
  }

  throw new Error('Not authenticated');
};

export interface IContext {
  prisma: PrismaClient;
  pubsub: PubSub;
  request: any;
}

export interface IAuthPayload {
  token: string;
  user: User;
}

export interface IFeedArgs {
  filter: string;
  skip: number;
  take: number;
  orderBy: LinkOrderByInput;
}

export interface IFeed {
  links: Link[];
  count: number;
}

export { APP_SECRET, getUserId };
