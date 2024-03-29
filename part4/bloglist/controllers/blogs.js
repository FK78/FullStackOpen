const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  });

  if (blog.title === undefined || blog.url === undefined) {
    response.status(400).json();
  } else {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  await Blog.findByIdAndUpdate(request.params.id, { likes: likes})
  response.status(204).end()
})

module.exports = blogsRouter;
