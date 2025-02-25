import { pipeline } from '@xenova/transformers';
import cors from 'cors'
import express from 'express';

const PORT = process.env.PORT || 8000;
const pipe = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
const app = express();
app.use(express.json());
app.use(cors());

app.post('/analyze', async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    
    const sentimentResult = await pipe(text);
    if (!sentimentResult) {
        return res.status(500).json({ error: 'Failed to analyze sentiment' });
    }
    // console.log(sentimentResult);
    
    return res.json({sentimentResult});
    
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
