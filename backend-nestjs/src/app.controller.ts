import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,

} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import * as bcrypt from 'bcrypt';
import TarhelyDataDto from './tarhelydata.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


    
  @Get('/api/tarhely')
  async index() {
  const [rows]: any = await db.execute(
    'SELECT * FROM tarhelycsomagok');
  return {row :rows};
  }
    

  
  @Get('/api/tarhely/:id')
  async getTarhelyApi(@Param('id') id: number) {
      const [rows] = await db.execute(
        'SELECT * FROM tarhelycsomagok WHERE id = ?',[id]);
      return rows[0];
  }

  @Put('/api/tarhely/:id')
  async putTarhelyApi(@Param('id') id: number,@Body() tarhelydata: TarhelyDataDto){
      await db.execute('UPDATE tarhelycsomagok SET nev = ? WHERE ar = 100',[tarhelydata.nev]);
  }


  @Post('/api/tarhely')
  async postTarhely(@Body() tarhelydata: TarhelyDataDto) {
      await db.execute('INSERT INTO tarhelycsomagok (nev, meret, ar) VALUES (?, ?, ?)', [
          tarhelydata.nev,
          tarhelydata.meret,
          tarhelydata.ar
      ]);
  }


  @Delete('/api/tarhely/:id')
  async deleteUserApi(@Param('id') id: number) {
      await db.execute(
        'DELETE FROM tarhelycsomagok WHERE id = ?',[id]);
  }


}
  


