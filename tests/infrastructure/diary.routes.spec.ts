import * as request from 'supertest';
import {  app, server }  from '../../src/index';
import { DiaryDto } from '../../src/infrastructure/dtos';
import { Visibility, Weather } from '../../src/domain/enums';

afterAll(() => {
    server.close();
})

describe('GET /api/diaries', () => {
    test('Should return 200 status code', async () => {
        const response = await request(app).get('/api/diaries').send();
        expect(response.status).toBe(200);
    });

    test('Should return diary array', async () => {
        const response = await request(app).get('/api/diaries').send();
        expect(response.body).toBeInstanceOf(Array<DiaryDto>);
    });

    test('Should return 404 status code', async () => {
        const diaryId: number = 100;
        const response = await request(app).get(`/api/diaries/${diaryId}`).send();
        expect(response.status).toBe(404);
    });

    test('Should return 200 status code', async () => {
        const diaryId: number = 1;
        const response = await request(app).get(`/api/diaries/${diaryId}`).send();
        expect(response.status).toBe(200);
    });

    test('Should return a diary equals to expected', async () => {
        const diaryId: number = 1;
        const response = await request(app).get(`/api/diaries/${diaryId}`).send();
        expect(response.body).toEqual({
            id: 1,
            date: '2021-01-01',
            comment: 'Cualquier cosa',
            weather: Weather.Windy,
            visibility: Visibility.good
        });
    });
});

describe('POST /api/diaries', () => {
    test('should return 201 status code', async () => {
        const reponse = await request(app).post(`/api/diaries`).send({
            id: 5,
            date: '2020-09-01',
            comment: 'Esto es una prueba',
            weather: Weather.Windy,
            visibility: Visibility.ok
        });

        expect(reponse.status).toBe(201);
    });

    test('should return 400 status code', async() => {
        const response = await request(app).post(`/api/diaries`).send({
            id: 1,
            date: '2020-09-01',
            comment: 'Esto es una prueba',
            weather: Weather.Windy,
            visibility: Visibility.ok
        });

        expect(response.status).toBe(400);
    });

    test('should return the message "Diary 1 already exists"', async() => {
        const response = await request(app).post(`/api/diaries`).send({
            id: 1,
            date: '2020-09-01',
            comment: 'Esto es una prueba',
            weather: Weather.Windy,
            visibility: Visibility.ok
        });

        expect(response.body).toEqual({ message: 'Diary 1 already exists' });
    });
});