import {Observable} from "tns-core-modules/data/observable";
import {ObservableArray} from "tns-core-modules/data/observable-array";
import {Photo} from "~/shared/photo";

export class BrowseViewModel extends Observable {
    public photos: ObservableArray<Photo>;

    constructor() {
        super();
        this.photos = new ObservableArray<Photo>([])
    }
}