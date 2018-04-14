import {NavigatedData, Page} from "tns-core-modules/ui/page";
import {BrowseViewModel} from "~/pages/browse/browse-view-model";
import {RadListView} from "nativescript-ui-listview";
import {ItemEventData} from "tns-core-modules/ui/list-view";

let frameModule = require("tns-core-modules/ui/frame");

import * as application from "application"
import {Photo, PhotoUtils} from "~/shared/photo";
import {View} from "tns-core-modules/ui/core/view";
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



export function onTap(event: ItemEventData) {
    console.log("tapped index" + event.index)
    const view = <View>event.view;
    const page = <Page>view.page;
    const tappedItem = <Photo>view.bindingContext;



    page.frame.navigate({
        moduleName: "pages/single/single-page",
        context: tappedItem,
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
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

