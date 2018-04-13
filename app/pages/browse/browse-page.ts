import {NavigatedData, Page} from "tns-core-modules/ui/page";
import {BrowseViewModel} from "~/pages/browse/browse-view-model";
import {RadListView} from "nativescript-ui-listview";
import {ItemEventData} from "tns-core-modules/ui/list-view";

// declare the view-model
let viewModel: BrowseViewModel;

let listView: RadListView;

export function onNavigatingTo(args: NavigatedData) {
    console.log("onNavigatingTo");
    let page = <Page> args.object;

    listView = page.getViewById('photos-list');
    viewModel = new BrowseViewModel();

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
                listView.notifyLoadOnDemandFinished()
            }, () => {
                listView.notifyLoadOnDemandFinished()
            })
    }, 50)

}