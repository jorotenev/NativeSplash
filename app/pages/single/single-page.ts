import {NavigatedData, Page} from "tns-core-modules/ui/page";
import {Photo} from "~/shared/photo";
// var utilityModule = require("utils/utils");
import * as utilityModule from "utils/utils";
import {EventData, fromObject, Observable} from "tns-core-modules/data/observable";
import {Button} from "tns-core-modules/ui/button";
import {savePhoto} from "~/utils";
import * as permissions from "nativescript-permissions";
import * as dialogs from "ui/dialogs"

let photo: Photo;
let bindingContext: Observable;

export function onNavigatingTo(event: NavigatedData) {
    let page = <Page> event.object;
    photo = <Photo> event.context;
    bindingContext = fromObject({
        photo: photo,
        busy: false
    });

    page.bindingContext = bindingContext
}

export function onSavePhoto() {
    console.log("save");
    bindingContext.set('busy', true)
    permissions.requestPermission([
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
    ], "I need these permissions")
        .then(function (res) {
            return savePhoto(photo.urls.full, photo)
        })
        .then(() => {
            console.log("saved");
            bindingContext.set('busy', false)

        })
        .catch(err => {
            console.log(err);
            bindingContext.set('busy', false);
            dialogs.alert("Photo already saved");
        })
}
