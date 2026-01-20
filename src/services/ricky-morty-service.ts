import axios from 'axios';
import type { Episode } from '../model/episodes';

export const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const getCharacters = async (url : string) => {
    const resp = await axios.get(url);
    return resp.data.results;
}

export const getEpisodes = async (episodesUrls : string[]) : Promise<Episode[]> => {
    const episodesIds = episodesUrls.map(url => {
        const parts = url.split('/');
        return parts[parts.length - 1]
    });
    const idStrings = episodesIds.join(',');
    const resp = await axios.get(`https://rickandmortyapi.com/api/episode/${idStrings}`);
    return resp.data;
}

export const cachingResults = (key : string,data : any) => {
    localStorage.setItem(key, JSON.stringify(data, null, 2));
}

export const getCachedResults = (key : string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}