import { User, Link } from '@prisma/client/index';
import { IContext } from '../utils';

const links = async (
  parent: User,
  args: Link,
  ctx: IContext,
): Promise<Link[]> => {
  return ctx.prisma.user.findOne({ where: { id: parent.id } }).links();
};

export default { links };
