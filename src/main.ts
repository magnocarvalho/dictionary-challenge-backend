import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Fullstack Challenge 🏅 2022 - Dictionary API')
    .setDescription('Backend API to Challenge full stack develop')
    .setContact('Magno Carvalho dos Santos', 'https://www.linkedin.com/in/magnocarv/', 'magnocarv@hotmail.com')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: false,
    })
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
