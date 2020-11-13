const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');

module.exports = {
  // adding the Post type here allows us to track anytime that a query/mutation/subscription returns a post, and allows us to make modifications to that Post using the methods defined here
  Post: {
    likeCount(parent) {
      console.log(parent);
      return parent.likes.length;
    },
    commentCount: (parent) => parent.comments.length
  },
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  }
}



