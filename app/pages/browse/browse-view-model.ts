import {Observable} from "tns-core-modules/data/observable";
import {ObservableArray} from "tns-core-modules/data/observable-array";
import {Photo} from "~/shared/photo";
import {getPhotos} from "~/shared/unsplash-service/api"
import * as platform from "tns-core-modules/platform";


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