import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client/index';
import { IContext, IAuthPayload, APP_SECRET } from '../../utils';

const auth = {
  async signup(parent: any, args: User, ctx: IContext): Promise<IAuthPayload> {
    const password = await bcrypt.hash(args.password, 10);
    const checkEmailExists = await ctx.prisma.user.findOne({
      where: { email: args.email },
    });
    if (checkEmailExists) {
      throw new Error('This email already exists');
    }
    const user = await ctx.prisma.user.create({ data: { ...args, password } });
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user,
    };
  },
  async login(parent: any, args: User, ctx: IContext): Promise<IAuthPayload> {
    const user = await ctx.prisma.user.findOne({
      where: { email: args.email },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error('invalid user or password');
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user,
    };
  },
};

export default auth;
