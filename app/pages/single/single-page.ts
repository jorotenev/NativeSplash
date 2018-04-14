import {NavigatedData, Page} from "tns-core-modules/ui/page";
import {Photo} from "~/shared/photo";

export function onNavigatingTo(event: NavigatedData) {
    console.log("On single");
    let page = <Page> event.object;
    let context = <Photo> event.context;
    console.dir(context)
    page.bindingContext = {
        photo: context
    }
}