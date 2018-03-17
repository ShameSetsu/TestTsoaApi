export interface MangaInfo {
    title: string,
    author: string,
    tags: Array<string>,
    characters: Array<string>,
    nbPage: number,
    thumbnail: string
}

export function isManga(object: any): boolean{
    return (object.title && object.author && object.tags && object.characters && object.nbPage && object.thumbnail);
}