import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NODE_ENV } from './constants/app.constant';
import { DatabaseModule } from 'src/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        NODE_ENV: Joi.string()
          .required()
          .valid(NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required().allow(''),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
