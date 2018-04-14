import {NavigatedData, Page} from "tns-core-modules/ui/page";
import {BrowseViewModel, imageLink} from "~/pages/browse/browse-view-model";
import {RadListView} from "nativescript-ui-listview";
import {ItemEventData} from "tns-core-modules/ui/list-view";
import * as platform from "tns-core-modules/platform";
import * as application from "application"
// declare the view-model
let viewModel: BrowseViewModel;

let listView: RadListView;

export function onNavigatingTo(args: NavigatedData) {
    console.log("onNavigatingTo");
    let page = <Page> args.object;

    listView = page.getViewById('photos-list');
    viewModel = new BrowseViewModel();

    application.getResources().imageLink = imageLink; // expose a converter function to the UI, application-wide
    page.bindingContext = viewModel
}


export function onPullToRefreshInitiated(event) {
    console.log("onPullToRefreshInitiated");
    listView.notifyPullToRefreshFinished();
}

export function onTap(event: ItemEventData) {
    console.log("tapped index" + event.index)
}

export function onLoadMoreItems(event) {
    console.log("[browse] loading more items");
    // setTimeout due to https://github.com/NativeScript/NativeScript/issues/4931
    setTimeout(() => {
        viewModel.addMorePhotos()
            .then(() => {
                console.log("Size of photos is " + viewModel.photos.length);
                listView.notifyLoadOnDemandFinished()
            }, () => {
                listView.notifyLoadOnDemandFinished()
            })
    }, 50)

}

