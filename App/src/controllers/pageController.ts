import { Body, Post, Route } from 'tsoa';

import { ApiResponse } from '../models/apiResponse.model';
import { isMangaPage, MangaPageInfo } from '../models/mangaPageInfo.model';
import { Mongo } from '../mongo';

@Route('manga/page')
export class PageController {
    mongo: Mongo = new Mongo();

    @Post()
    public async postPage(@Body() requestBody: MangaPageInfo): Promise<any> {
        console.log('requestBody', JSON.stringify(requestBody));
        return new Promise<ApiResponse>((resolve, reject)=>{

            if(isMangaPage(requestBody)) {
                this.setStatus(400);
                resolve(<ApiResponse>{
                    success: false,
                    message: 'Bad parameters',
                    requestPayload: requestBody
                });
            }

            this.mongo.insert('page', requestBody).then(res=>{
                resolve(<ApiResponse>{
                    success: true,
                    message: res,
                    requestPayload: requestBody
                });
            });
        });
    }
}