import express from "express";
import { getPosts,getPost,getPostsBySearch, createPost, updatedPost, deletePost, likePost,commentPost } from "../controllers/posts.js";
import auth from '../middleware/auth.js';

const router = express.Router();

router.get("/", getPosts);
router.get('/:id',getPost);
router.get('/search',getPostsBySearch);
router.post("/",auth, createPost);
router.patch("/:id",auth, updatedPost);
router.delete('/:id',auth,deletePost);
router.patch("/:id/likePost",auth,likePost);
router.post('/:id/commentPost', commentPost);
export default router;
