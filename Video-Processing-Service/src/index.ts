import express from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express();
app.use(express.json());

app.post('/process-video', (req, res) => {
    //Get path of  the input video file from request body 
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    if (!inputFilePath || !outputFilePath) {
        res.status(400).send("Bad request : missing file path");
    }
    ffmpeg(inputFilePath)
        .output(outputFilePath)
        .on('end', () => {
            res.status(200).send('video sucessfully uploaded');
        })
        .on('error', (err) => {
            res.status(500).send('Internal server error');
        })
        .save(outputFilePath);
});



const  port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Video Processing Service listening at http://localhost:${port}`)
});
