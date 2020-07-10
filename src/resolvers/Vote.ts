import { User, Link, Vote } from '@prisma/client/index';
import { IContext } from '../utils';

const link = async (
  parent: Vote,
  args: Link,
  ctx: IContext,
): Promise<Link | null> => {
  return ctx.prisma.vote.findOne({ where: { id: parent.id } }).link();
};

const user = async (
  parent: Vote,
  args: User,
  ctx: IContext,
): Promise<User | null> => {
  return ctx.prisma.vote.findOne({ where: { id: parent.id } }).user();
};

export default { link, user };
