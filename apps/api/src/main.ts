import { NestFactory } from '@nestjs/core';
import { getRepository } from 'typeorm';
import { TypeormStore } from 'connect-typeorm';

import * as session from 'express-session';
import * as passport from 'passport';

import { AppModule } from './app.module';
import { Session } from './entities/session.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const sessionRepository = getRepository(Session);

  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 1000 * 60 * 24,
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
