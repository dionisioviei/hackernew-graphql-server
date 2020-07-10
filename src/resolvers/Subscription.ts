import { Link, Vote } from '@prisma/client/index';
import { IContext } from '../utils';

const newLinkSubscribe = (_: any, args: Link, ctx: IContext): any => {
  return ctx.pubsub.asyncIterator('NEW_LINK');
};

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload: Link): Link => {
    return payload;
  },
};

const newVoteSubscribe = (_: any, args: Vote, ctx: IContext): any => {
  return ctx.pubsub.asyncIterator('NEW_VOTE');
};

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: (payload: Vote): Vote => {
    return payload;
  },
};

export default { newLink, newVote };
