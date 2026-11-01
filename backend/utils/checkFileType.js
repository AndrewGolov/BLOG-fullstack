const {fileTypeFromFile} = require('file-type');

const checkFileType = async (checkFile) => {
    if (!checkFile) return

        const type = await fileTypeFromFile(checkFile.filepath);
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/webp',
        ];

        if (!type || !allowedTypes.includes(type.mime)) {
            return {error: 'Недопустимый формат изображения'};
        }
        return checkFile
}
module.exports = checkFileType;
