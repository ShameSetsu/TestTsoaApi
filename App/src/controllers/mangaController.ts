import { Route, Controller, Query, Get } from "tsoa";
import { MangaInfo } from "../models/mangaInfo.model";
import { MangaService } from "../services/mangaService";

@Route('manga')
export class MangaController extends Controller {

    @Get()
    public async getManga(): Promise<MangaInfo> {
        // return await new MangaService().getManga();
        console.log('getManga');
        return new Promise<MangaInfo>((resolve, reject)=>{
            console.log('Promise');
            resolve(<MangaInfo>{
                id: 0,
                title: 'title',
                author: 'author',
                characters: ['Aya', 'Momiji'],
                tags: ['yuri']
            });
        });
    }
}