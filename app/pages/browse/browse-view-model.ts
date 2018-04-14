import {Observable} from "tns-core-modules/data/observable";
import {ObservableArray} from "tns-core-modules/data/observable-array";
import {Photo} from "~/shared/photo";
import {getPhotos} from "~/shared/unsplash-service/api"
import * as platform from "tns-core-modules/platform";

export function imageLink(url) {
    let w = platform.screen.mainScreen.widthPixels;
    let h = platform.screen.mainScreen.heightPixels;

    // q = quality (in %), reduces the size
    // entropy - crop it but try to ensure that the interesting parts of the image are visible
    let result = `${url}&crop=entropy&w=${w}&h=${w}&fit=crop&q=0.1`;
    console.log(result);
    return result
}

export class BrowseViewModel extends Observable {

    // the array to which the UI is bind
    public photos: ObservableArray<Photo>;

    // number of items which will be added to `photos` on each
    // request for new photos. correspondents to unsplash's per_page
    private readonly batchSize = 10;

    constructor() {
        super();
        this.photos = new ObservableArray<Photo>([]);

        this.addMorePhotos()
    }

    public get imageWidth() {
        return platform.screen.mainScreen.widthPixels
    }

    public get imageHeight() {
        return platform.screen.mainScreen.widthPixels
    }

    public addMorePhotos(): Promise<void> {
        console.log("addMorePhotos called");
        let currentlyLoadedPages = Math.ceil(this.photos.length / this.batchSize);

        let photos = getPhotos({
            page: currentlyLoadedPages + 1,
            per_page: this.batchSize
        });


        return new Promise<void>((resolve, reject) => {
            // return Promise.resolve()
            photos.then((newPhotos: Photo[]) => {
                console.log(`${newPhotos.length} photos received by view-model`);

                newPhotos.forEach(photo => {
                    console.log(photo.urls.raw);
                    this.photos.push(photo)
                });
                resolve()
            }, (err) => {
                reject(err)
            });

        })
    }
}