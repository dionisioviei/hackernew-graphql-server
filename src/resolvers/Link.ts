import { User, Link, Vote } from '@prisma/client/index';
import { IContext } from '../utils';

const postedBy = async (
  parent: Link,
  args: User,
  ctx: IContext,
): Promise<User | null> => {
  return ctx.prisma.link.findOne({ where: { id: parent.id } }).postedBy();
};

const votes = async (
  parent: Link,
  args: Vote,
  ctx: IContext,
): Promise<Vote[]> => {
  return ctx.prisma.link.findOne({ where: { id: parent.id } }).votes();
};

export default { postedBy, votes };
