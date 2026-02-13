import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './dataSource';

async function bootstrap() {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize()
      console.log("Data Source has been initialized!")
    } catch (error) {
      console.error("Error during Data Source initialization", error)
      process.exit(1)
    }
  }

  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  app.enableCors({
    origin: process.env.VITE_FRONT_URL || 'http://localhost:5173',
    methods: 'GET,HEAD,PATCH,POST',
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
