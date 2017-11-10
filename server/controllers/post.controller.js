import Post from '../models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    res.status(403).end();
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

/**
 * Create a single comment
 * @param req
 * @param res
 * @returns void
 */
export function addComment(req, res) {
  if (!req.body.post.name || !req.body.post.content) {
    res.status(403).end();
  }
  const nPost = new Post;
  const newComment = nPost.comments.create({
    name: sanitizeHtml(req.body.post.name),
    content: sanitizeHtml(req.body.post.content),
  });
  Post.findOneAndUpdate({ cuid: req.body.post.cuid },
    { $push: { comments: newComment } },
    { new: true }).exec((err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({ newComment });
    });
  return;
}

/**
 * Change a rating
 * @param req
 * @param res
 * @returns void
 */
export function likeComment(req, res) {
  if (!req.body.post.cuid || !req.body.post._id || !req.body.post.direct) {
    res.status(403).end();
    return;
  }

  Post.update({ cuid: req.body.post.cuid, 'comments._id': req.body.post._id },
  { $inc: { 'comments.$.rating': req.body.post.direct } }, (err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ err: '' });
  });
  return;
}
/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}
