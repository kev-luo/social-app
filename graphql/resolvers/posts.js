const { AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        return posts;
      } catch(err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if(post) {
          return post
        } else {
          throw new Error('Post not found')
        }
      } catch(err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      console.log(user);
      // if we get to this point that means the user is authenticated
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      const post = await newPost.save();

      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      // we need to check that the user is deleting their own post
      try {
        // first find post
        const post = await Post.findById(postId);
        if(user.username === post.username) {
          await post.deleteOne();
          return 'Post deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        } 
      } catch(err) {
        throw new Error(err);
      }
    }
  }
}