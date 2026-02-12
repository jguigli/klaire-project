import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './dataSource';

async function bootstrap() {
  try {
    await AppDataSource.initialize()
    console.log("Data Source has been initialized!")
  } catch (error) {
      console.error("Error during Data Source initialization", error)
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
