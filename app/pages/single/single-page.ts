import {NavigatedData, Page} from "tns-core-modules/ui/page";
import {Photo} from "~/shared/photo";
import {fromObject, Observable} from "tns-core-modules/data/observable";
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

/**
 * Figuring out how to save a photo was achieved with the help of:
 * - https://github.com/NickIliev/NativeScript-Cosmos-Databank/blob/master/app/views/helpers/files/file-helpers.ts#L32
 * - https://discourse.nativescript.org/t/how-do-i-create-a-folder-in-external-storage/3019/11
 * - https://github.com/NickIliev/NativeScript-Cosmos-Databank/blob/d1db9e4a33a14ba558a2471089eec879589f35dd/app/views/drawer-page.js#L14-L26
 */
export function onSavePhoto() {
    console.log("save");
    bindingContext.set('busy', true);
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
