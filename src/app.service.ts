import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const imageUrl = '../public/picture.jpg';
    // setTimeout(()=>{
    //   console.log('Async operation completed');
    // },3000);
    return `
   <html>
        <body>
          <h1>Hello, and welcome to my chatroom! Foundation Vu Trung Nghia</h1>
          <div style="text-align: center;">
            <img src="${imageUrl}" alt="Image" style="margin: auto;">
          </div>
        </body>
      </html>
     `;
  }
}
