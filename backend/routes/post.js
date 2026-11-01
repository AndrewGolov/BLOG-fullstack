const express = require("express");
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
const fs = require("node:fs/promises");
const handleFormData = require("../utils/handleFormData");
const router = express.Router({ mergeParams: true });
const path = require("node:path");

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
  "/:postId/comments/:commentId",
  auth,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId);
    console.log(
      `Комментарий ${req.params.commentId} к посту ${req.params.postId} удален`,
    );

    res.send({ error: null });
  },
);
router.post("/create", auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const handleData = await handleFormData(req, "create");

    if (handleData.error) {
      return res.status(400).json({ error: handleData.error });
    }

    const newPost = await addPosts(handleData.postData);

    await fs.rename(
      `upload/temp/${handleData.imageData.tempImageName}`,
      `upload/${handleData.imageData.tempImageName}`,
    );

    return res.status(200).json({ data: mapPost(newPost) });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
});
router.patch("/:id", auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const handleData = await handleFormData(req, "update");

    if (handleData.error) {
      return res.status(400).json({ error: handleData.error });
    }

    const updatedPost = await editPost(req.params.id, handleData.postData);

    if (handleData.imageData) {
      await fs.rename(
        `upload/temp/${handleData.imageData.tempImageName}`,
        `upload/${handleData.imageData.tempImageName}`,
      );
    }

    return res.send({ data: mapPost(updatedPost) });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});
router.delete("/:id", auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  await deletePost(req.params.id);
  console.log(`Администратор удалил пост с ${req.params.id} ID`);

  res.send({ error: null });
});

module.exports = router;
