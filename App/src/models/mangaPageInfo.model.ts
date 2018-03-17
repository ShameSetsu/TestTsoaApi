export interface MangaPageInfo {
    mangaId: number,
    index: number,
    imageUri: string
}

export function isMangaPage(object: any): boolean{
    return (object.mangaId && object.index && object.imageUri)
}