import Query from './Query';
import auth from './Mutation/auth';
import post from './Mutation/post';
import User from './User';
import Link from './Link';
import Vote from './Vote';
import Subscription from './Subscription';

export default {
  Query,
  Mutation: {
    ...auth,
    ...post,
  },
  Subscription,
  User,
  Link,
  Vote,
};
