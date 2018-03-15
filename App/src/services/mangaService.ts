import { MangaInfo } from "../models/mangaInfo.model";

export class MangaService {
    constructor(){}

    getManga(): Promise<MangaInfo>{
        return new Promise<MangaInfo>((resolve, reject)=>{
            resolve(<MangaInfo>{
                id: 0,
                title: 'title',
                author: 'author',
                characters: ['Aya', 'Momiji'],
                tags: ['yuri']
            });
        })
    }
}