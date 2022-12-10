import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDD9F8rRZZlHqniDuXWpobz4ZJjwDxqeOw",
  authDomain: "todo-app-ab54d.firebaseapp.com",
  projectId: "todo-app-ab54d",
  storageBucket: "todo-app-ab54d.appspot.com",
  messagingSenderId: "864788718892",
  appId: "1:864788718892:web:f81d2f5314e97fa2a87889",
  measurementId: "G-1GZRP2TDHP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(2000);
  console.log(`Apollo Todo is running on: ${await app.getUrl()}`);
}
bootstrap();
