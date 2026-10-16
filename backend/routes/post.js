const express = require('express');
const {
    addPosts,
        editPost,
        deletePost,
        getPosts,
        getPost,
} = require("../controllers/post");
const { addComment, deleteComment } = require("../controllers/comment");
const mapPost = require("../helpers/mapPost");
const mapComment = require("../helpers/mapComment");
const auth = require("../middleware/authenticated");
const hasRole = require("../middleware/hasRole");
const ROLES = require("../constants/role");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
    const { posts, lastPage } = await getPosts(
        req.query.search,
        req.query.limit,
        req.query.page,
    );
    res.send({ data: { lastPage, posts: posts.map(mapPost) } });
});

router.get("/:id", async (req, res) => {
    const post = await getPost(req.params.id);
    res.send({ data: mapPost(post) });
});

router.post("/:id/comments", auth, async (req, res) => {
    const newComment = await addComment(req.params.id, {
        content: req.body.content,
        author: req.user.id,
    });
    res.send({ data: mapComment(newComment) });
});

router.delete(
    "/:postId/comments/:commentId", auth,
    hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
    async (req, res) => {
        console.log('MODERATOR KILL COMMENT:', req.params.postId, req.params.commentId)

        await deleteComment(req.params.postId, req.params.commentId);
        res.send({ error: null });
    },
);

router.post("/", auth, hasRole([ROLES.ADMIN]), async (req, res) => {
    const newPost = await addPosts({
        title: req.body.title,
        content: req.body.content,
        image: req.body.imageUrl,
    });
    res.send({ data: mapPost(newPost) });
});

router.patch("/:id", auth, hasRole([ROLES.ADMIN]), async (req, res) => {
    const updatedPost = await editPost(req.params.id, {
        title: req.body.title,
        content: req.body.content,
        image: req.body.imageUrl,
    });
    res.send({ data: mapPost(updatedPost) });
});

router.delete("/:id", auth, hasRole([ROLES.ADMIN]), async (req, res) => {
    console.log('Admin delete post ID', req.params.id);
    res.send({ error: null });
});

module.exports = router;