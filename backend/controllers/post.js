const Post = require('../models/Post')
const path = require('node:path');
const fs = require('fs');

async function addPosts(postData) {
    const newPost = await Post.create(postData)
        return await newPost.populate({
        path:'comments',
        populate: 'author'
    })
}

async function editPost(id, postData) {
    const {image} = await Post.findById(id)
    const imagePath = path.join(__dirname, '..', image)
    const updatedPost =  await Post
        .findByIdAndUpdate(id, postData, {returnDocument: 'after'})
        .populate({
             path:'comments',
             populate: 'author'
        })

        if(postData.image) {
            fs.unlink(imagePath, (err) => {
                if(err) {
                    console.log(err)
                }
            })
        }
        return updatedPost
}

async function deletePost(id) {
    const deletedPost = await Post.findByIdAndDelete({_id: id})
    if(deletedPost) {
        const imagePath = path.join(__dirname, '..', deletedPost.image)
        fs.unlink(imagePath, (err) => {
            if(err) {
            console.log(err)
            }
        })
    }
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
