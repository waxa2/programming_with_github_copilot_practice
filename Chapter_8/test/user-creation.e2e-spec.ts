/**
 Feature: User Account Creation
  As a user,
  I want to be able to add an account,
  So that I can work on my to-do list

  Scenario: Successful Account Creation
    Given I am on the registration page
    And I enter valid username and password
    When I click on the register button
    Then I should be redirected to my personal to-do list page
    And I should see a confirmation message that my account has been created

  Scenario: Failed Account Creation - User Already Exists
    Given I am on the registration page
    And I enter a username that is already taken
    When I click on the register button
    Then I should see an error message that the username is already taken
 */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('User Account Creation (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: ['./**/*.entity.ts'],
          synchronize: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Successful Account Creation', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({ username: 'user1', password: 'Testp@ssword1' })
      .expect(201);
  });

  it('Failed Account Creation - User Already Exists', async () => {
    const userCredentials = { username: 'user2', password: 'Testp@ssword2' };
    await request(app.getHttpServer())
      .post('/user')
      .send(userCredentials)
      .expect(201);

    await request(app.getHttpServer())
      .post('/user')
      .send(userCredentials)
      .expect(400);
  });
});
