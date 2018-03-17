import { Route, Controller, Query, Get, Post, Body } from "tsoa";
import { MangaInfo, isManga } from "../models/mangaInfo.model";
import { MangaService } from "../services/mangaService";
import { ApiResponse } from "../models/apiResponse.model";
import { Mongo } from "../mongo";
const uuidv1 = require('uuid/v1');


@Route('manga')
export class MangaController extends Controller {

    mongo: Mongo = new Mongo();

    @Get()
    public async getManga(): Promise<MangaInfo> {
        // return await new MangaService().getManga();
        console.log('getManga');
        return new Promise<MangaInfo>((resolve, reject)=>{
            console.log('Promise');
            resolve(<MangaInfo>{
                title: 'title',
                author: 'author',
                characters: ['Aya', 'Momiji'],
                tags: ['yuri'],
                nbPage: 20
            });
        });
    }

    @Post()
    public async postManga(@Body() requestBody: any): Promise<ApiResponse> {
        console.log('requestBody', requestBody);
        return new Promise<ApiResponse>((resolve, reject)=>{
            let manga = {
                title: 'title',
                author: 'author',
                characters: ['Aya', 'Momiji'],
                tags: ['yuri'],
                nbPage: 20
            }
            if(isManga(requestBody)){
                this.setStatus(400);
                resolve(<ApiResponse>{
                    success: false,
                    message: 'Bad parameters',
                    requestPayload: requestBody
                });
            }
            
            this.mongo.insert('manga', requestBody).then(res=>{
                resolve(<ApiResponse>{
                    success: true,
                    message: res,
                    requestPayload: requestBody
                });
            });
                
        });
    }
}