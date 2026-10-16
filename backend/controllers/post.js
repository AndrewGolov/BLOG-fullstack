const Post = require('../models/Post')

async function addPosts(postData) {
    const newPost = await Post.create(postData)
        return await newPost.populate({
        path:'comments',
        populate: 'author'
    })

}

async function editPost(id, postData) {
    return await Post
     .findByIdAndUpdate(id, postData, {returnDocument: 'after'})
     .populate({
        path:'comments',
        populate: 'author'
    })
}

function deletePost(id) {
    return Post.deleteOne({_id: id})
}

async function getPosts(search ='',limit = 10,page = 1 ) {
    const [posts,count] = await Promise.all([
        Post.find({
            title: {$regex: search, $options:'i'}})
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({createdAt: -1}),
        Post.countDocuments({
            title: {$regex: search, $options:'i'}})

    ])
    return {posts,lastPage: Math.ceil(count/limit)}
}

function getPost(id) {
    return Post.findById(id).populate({
        path:'comments',
        populate: 'author'
    })
}

module.exports = {
    addPosts,
    editPost,
    deletePost,
    getPosts,
    getPost
}
