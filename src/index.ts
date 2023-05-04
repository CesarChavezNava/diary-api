import * as express from 'express';
import router from './infrastructure/routes/diary.routes';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_, res) => {
    res.send('pong');
});

app.use('/api/diaries', router);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})
