import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Environment } from './env/environment';
import * as path from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  app.setGlobalPrefix('api/buyer');
  if (Environment.env != 'prod') {
    const config = new DocumentBuilder()
      .setTitle('P2P - Buyer Service')
      .setDescription('P2P - API Swagger')
      .setVersion('1.0.0')
      .addBearerAuth()
      .setContact(
        'Simbiotik Technologies Sdn Bhd',
        'https://simbiotiktech.com',
        'parth.patel@simbiotiktech.com',
      )
      .build();
    const options: SwaggerDocumentOptions = {
      deepScanRoutes: true,
    };
console.log("######## SERVER RUNNING");

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('buyer/swagger', app, document);
  }

  await app.listen(3003);
}
bootstrap();
