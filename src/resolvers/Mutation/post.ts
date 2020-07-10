import { Link, Vote } from '@prisma/client/index';
import { getUserId, IContext } from '../../utils';

const post = {
  async post(parent: any, args: Link, ctx: IContext): Promise<Link> {
    const userId = getUserId(ctx);

    const newLink = await ctx.prisma.link.create({
      data: {
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: Number(userId) } },
      },
    });

    ctx.pubsub.publish('NEW_LINK', newLink);
    return newLink;
  },
  async updateLink(parent: any, args: Link, ctx: IContext): Promise<Link> {
    return ctx.prisma.link.update({
      where: {
        id: args.id,
      },
      data: {
        ...ctx.prisma.link.findOne({ where: { id: args.id } }),
        ...args,
      },
    });
  },
  async deleteLink(parent: any, args: Link, ctx: IContext): Promise<Link> {
    const id = Number(args.id);
    return ctx.prisma.link.delete({
      where: { id },
    });
  },
  async vote(_: any, args: Vote, ctx: IContext): Promise<Vote> {
    const userId = getUserId(ctx);
    const vote = await ctx.prisma.vote.findOne({
      where: {
        linkId_userId: {
          linkId: Number(args.linkId),
          userId,
        },
      },
    });
    if (vote) {
      throw new Error(`Already vote for link ${args.linkId}`);
    }

    const newVote = ctx.prisma.vote.create({
      data: {
        user: { connect: { id: userId } },
        link: { connect: { id: Number(args.linkId) } },
      },
    });
    ctx.pubsub.publish('NEW_VOTE', newVote);
    return newVote;
  },
};

export default post;
