const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
app.use(fileUpload());

// 上传文件
app.post('/upload', (req, res) => {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // 访问上传文件
    sampleFile = req.files.file;
    uploadPath = path.join(__dirname, 'uploads', sampleFile.name);

    // 将文件移动到指定目录
    sampleFile.mv(uploadPath, function(err) {
        if (err) {
            return res.status(500).send(err);
        }

        res.send({ success: true });
    });
});

// 下载文件
app.get('/download', (req, res) => {
    const filename = req.query.file;
    const filePath = path.join(__dirname, 'uploads', filename);
    res.download(filePath, filename, (err) => {
        if (err) {
            res.status(500).send('文件下载失败');
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on http://192.168.30.233:3000');
});
