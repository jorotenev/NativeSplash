import {NavigatedData, Page} from "tns-core-modules/ui/page";
import {BrowseViewModel} from "~/pages/browse/browse-view-model";

// declare the view-model
let viewModel: BrowseViewModel;

export function onNavigatingTo(args: NavigatedData) {
    let page = <Page> args.object;
    viewModel = new BrowseViewModel();
    page.bindingContext = viewModel
}

export function onLoadMoreItems(event) {
    console.log("[browse] loading more items");
}