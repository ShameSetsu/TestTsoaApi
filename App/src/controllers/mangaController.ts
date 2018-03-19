import { Body, Controller, Get, Post, Query, Route } from 'tsoa';

import { ApiResponse } from '../models/apiResponse.model';
import { isManga, MangaInfo } from '../models/mangaInfo.model';
import { Mongo } from '../mongo';

@Route('manga')
export class MangaController extends Controller {

    mongo: Mongo = new Mongo();

    @Get('page/{page}')
    public async getMangaPage(page: number, @Query() tag?: string): Promise<Array<MangaInfo>> {
        // return await new MangaService().getManga();
        console.log('getManga', page +' '+tag);
        return new Promise<Array<MangaInfo>>((resolve, reject)=>{
            this.mongo.findInArray('manga', 'tags', tag, (page - 1) * 20, 20).then(res=>{
                resolve(<Array<MangaInfo>>res);
            });
        });
    }

    @Get('{id}')
    public async getManga(id: string): Promise<MangaInfo> {
        // return await new MangaService().getManga();
        console.log('getManga', id);
        return new Promise<MangaInfo>((resolve, reject)=>{
            this.mongo.findById('manga', id).then(res=>{
                resolve(<MangaInfo>res);
            });
        });
    }

    @Post()
    public async postManga(@Body() requestBody: MangaInfo): Promise<ApiResponse> {
        console.log('requestBody', requestBody);
        return new Promise<any>((resolve, reject)=>{

            if(!isManga(requestBody)) {
                this.setStatus(400);
                resolve(<ApiResponse>{
                    success: false,
                    message: 'Bad parameters',
                    requestPayload: requestBody
                });
            }else{
                this.mongo.insert('manga', requestBody).then(res=>{
                    resolve(<ApiResponse>{
                        success: true,
                        message: res,
                        requestPayload: requestBody
                    });
                });
            }
        });
    }
}