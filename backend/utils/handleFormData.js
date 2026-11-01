const formidable = require("formidable");
const checkFileType = require("./checkFileType");
const fs = require('node:fs/promises');

const handleFormData = async (req, method) => {
    try{
        await fs.mkdir("temp", {recursive: true});

        const form = new formidable.IncomingForm({
            uploadDir: 'temp', keepExtensions: true, maxFiles: 1
        });

        const [fields, files] = await form.parse(req)
        const {title,content} = fields;
        const imageFile = files.image?.[0];

        if(!title[0] || !content[0]) {
            throw new Error('Заполните все необходимые поля:');
        }

        if(method === 'create' && !imageFile) {
            throw new Error('Необходимо добавить изображение');
        }

        const newPost = {
            title:title[0],
            content:content[0],
        }
        const imageData = {}

        if(imageFile) {
            const checkImage = await checkFileType(imageFile);

            if(checkImage.error) {
                throw new Error(checkImage.error)
            }

            newPost.image = `/upload/${imageFile.newFilename}`;
            imageData.tempImageName = imageFile.newFilename
        }

        return imageFile? {postData:newPost,imageData }:{postData:newPost};
    } catch (e) {
        console.log(e);
        return {error:e};
    }
}
module.exports = handleFormData;