import { IContext, IFeedArgs, IFeed } from '../utils';

const Query = {
  info(): string {
    return 'This is the API of a Hackernews Clone';
  },
  async feed(parent: any, args: IFeedArgs, ctx: IContext): Promise<IFeed> {
    const where = args.filter
      ? {
          OR: [
            { description: { contains: args.filter } },
            { url: { contains: args.filter } },
          ],
        }
      : {};

    const links = await ctx.prisma.link.findMany({
      where,
      skip: args.skip,
      take: args.take,
      orderBy: args.orderBy,
    });
    const count = await ctx.prisma.link.count({ where });

    return {
      links,
      count,
    };
  },
};

export default Query;
