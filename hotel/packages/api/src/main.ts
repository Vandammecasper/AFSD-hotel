import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Hotel API Documentation')
    .setDescription('Hotel API description')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  await app.listen(3000);
  console.info(`Server is running on: ${await app.getUrl()}`)
  console.info(`GraphQL is running on: ${await app.getUrl()}/graphql`)
  console.info(`Swagger is running on: ${await app.getUrl()}/api`)
}
bootstrap();
