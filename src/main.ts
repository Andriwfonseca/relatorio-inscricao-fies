const config = require('config');
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './commons/filters/all-exceptions.filter';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

const title = '';
const description = '';
const version = '1.0';

async function bootstrap () {
  console.info('------------- Service Running -------------');
  console.info(`http://localhost:${config.get('port')}/swagger/`);
  console.info(`http://localhost:${config.get('port')}/`);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.set('view options', { layout: 'template' });
  app.setLocal('prefix', config.get('prefix'));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(config.get('port'));
}
bootstrap();
