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
const formidable = require('formidable')
const {IncomingForm } = formidable;
const path = require('node:path');
const fs = require('node:fs/promises');
const uploadDir = path.join(__dirname, '../upload');

const router = express.Router({ mergeParams: true });

router.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});
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

router.post("/create", auth, hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        await fs.mkdir(uploadDir, {recursive: true});
        const form = new IncomingForm({
            uploadDir: 'upload', keepExtensions: true, maxFiles: 1
        });
        await form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({error: 'Ошибка загрузки файла'});
            }

            const imageFile = files.image[0];

            if (!imageFile) {
                return res.status(400).json({error: 'Изображение не загружено'});
            }

            try {
                const {fileTypeFromFile} = await import('file-type');
                const type = await fileTypeFromFile(imageFile.filepath);
                const allowedTypes = [
                    'image/jpeg',
                    'image/png',
                    'image/webp',
                    'image/gif',
                ];

                if (!type || !allowedTypes.includes(type.mime)) {
                    await fs.unlink(imageFile.filepath);
                    return res.status(400).json({error: 'Недопустимый формат изображения'});
                }

                const newPost = await addPosts({
                    title: fields.title?.[0],
                    content: fields.content?.[0],
                    image: `/upload/${imageFile.newFilename}`,
                });

                return res.status(201).json({data: mapPost(newPost)});
            } catch (error) {
                console.error(error);
                return res.status(500).json({error: 'Не удалось создать пост'});
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ошибка сервера' });
    }
})

router.patch("/:id", auth, hasRole([ROLES.ADMIN]), async (req, res) => {
    try{
        const form = new IncomingForm({
            uploadDir: 'upload', keepExtensions: true, maxFiles: 1
        });

        await form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({error: 'Ошибка загрузки файла'});
            }

            const imageFile = files.image?.[0];
            if(!imageFile) {
                const updatedPost = await editPost(req.params.id, {
                    title: fields.title?.[0],
                    content: fields.content?.[0]
                });
                return res.send({ data: mapPost(updatedPost) });
            }

            try {
                const {fileTypeFromFile} = await import('file-type');
                const type = await fileTypeFromFile(imageFile.filepath);
                const allowedTypes = [
                    'image/jpeg',
                    'image/png',
                    'image/webp',
                    'image/gif',
                ];

                if (!type || !allowedTypes.includes(type.mime)) {
                    await fs.unlink(imageFile.filepath);
                    return res.status(400).json({error: 'Недопустимый формат изображения'});
                }

                const updatePost = await editPost(req.params.id,{
                    title: fields.title?.[0],
                    content: fields.content?.[0],
                    image: `/upload/${imageFile.newFilename}`,
                });

                return res.status(201).json({data: mapPost(updatePost)});
            } catch (error) {
                console.error(error);
                return res.status(500).json({error: 'Не удалось создать пост'});
            }
        })
    } catch (e) {
    console.error(e);
    }
});

router.delete("/:id", auth, hasRole([ROLES.ADMIN]), async (req, res) => {
    console.log('Admin delete post ID', req.params.id);
    await deletePost(req.params.id);
    res.send({ error: null });
});

module.exports = router;