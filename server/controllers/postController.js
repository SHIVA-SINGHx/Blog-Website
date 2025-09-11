import Post from "../models/postModel.js";

// ALL THE POSTS
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
};

// ONLY ONE PARTICULAR POST
export const getPost = async (req, res) => {
  try {
    const posts = await Post.findOne({ slug: req.params.slug });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
};


//CREATE POSTS
export const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);

    const post = await newPost.save();
    res.status(200).json(post, "post created succesfully");
  } catch (error) {
    console.log(error);
  }
};


// DELETE POST
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("post has been deleted succesfully");
  } catch (error) {
    console.log(error);
  }
};
