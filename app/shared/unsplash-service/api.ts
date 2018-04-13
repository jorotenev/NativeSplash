import {HttpResponse} from "tns-core-modules/http";
import * as http from "http";
import {Photo, PhotoSize} from "~/shared/photo";

const secrets = require("~/unsplash_secrets.json");

const api_url = "https://api.unsplash.com/";
const access_token = secrets.access_token; // you need an unsplash dev account for that.

export function generatePhotoViewURL(photo: Photo, preferredWidth: number) {
    let url = `${photo.urls.full}&w=${preferredWidth}`
}

/**
 * https://unsplash.com/documentation#list-photos
 * @param {UnsplashGetPhotosOpts} options
 */
export function getPhotos(options?: UnsplashGetPhotosOpts): Promise<Photo[]> {

    const opts = {
        per_page: 20,
        page: 1,
        ...options
    };

    const endpoint = "photos";
    const url = `${api_url}${endpoint}/?page=${opts.page}&per_page=${opts.per_page}&client_id=${access_token}`;
    //todo remove fake
    let fake = require("./fake_response.json");
    return Promise.resolve(convertResponsePhotosToInternalFormat(fake))
    // return new Promise(function (resolve, reject) {
    //     http.getJSON(url)
    //         .then(function (response: UnsplashPhotosResult[]) {
    //             console.log(`API returned ${response.length} objects`);
    //
    //             // convert the response to our representation, since we don't need all of the properties.
    //             let converted = convertResponsePhotosToInternalFormat(response)
    //
    //             resolve(converted)
    //         }, err => {
    //             console.dir(err);
    //             reject(err)
    //         });
    // })

}

function convertResponsePhotosToInternalFormat(photos: UnsplashPhotosResult[]) {
    return photos.map(singlePhoto => {
        return <Photo> {
            id: singlePhoto.id,
            created_at: singlePhoto.created_at,
            authorHandle: singlePhoto.user.username,
            authorName: singlePhoto.user.name,
            likes: singlePhoto.likes,
            urls: singlePhoto.urls,
            download_link: singlePhoto.links.download
        }
    });
}

interface UnsplashGetPhotosOpts {
    page: number,
    per_page: number
}


// some of the properties that are received from the API for a single photo
interface UnsplashPhotosResult {
    id: string
    created_at: string
    updated_at: string
    width: number
    heigth: number
    likes: number
    description: string
    user: { id: string, username: string, name: string }

    urls: {[s in PhotoSize]:string} // hack
    links: any // hack
}