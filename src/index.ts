import * as express from 'express';
import { authRouter, diaryRouter } from './infrastructure/routes';
//import { authMiddleware } from './infrastructure/middlewares';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_, res) => {
    res.send('pong');
});

app.use('/api/auth', authRouter)
//app.use('/api/diaries', authMiddleware.validate, diaryRouter);
app.use('/api/diaries', diaryRouter);

const server = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})

export  { app, server }