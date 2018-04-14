import {Observable} from "tns-core-modules/data/observable";
import {Photo} from "~/shared/photo";
import * as application from "application"
import * as fileSystem from "file-system";
import {ImageSource} from "tns-core-modules/image-source";
import * as http from "http"
import * as enums from "ui/enums";

declare let android;

/**
 * Decorate a property of a class which extends Observable, so that
 * changing the value of the property will automatically fire the propertyChangeEvent
 *
 * source: https://www.nativescript.org/blog/nativescript-observable-magic-string-property-name-be-gone
 */
export function ObservableProperty() {

    return (target: Observable, propertyKey: string) => {
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return this["_" + propertyKey];
            },
            set: function (value) {
                if (this["_" + propertyKey] === value) {
                    return;
                }

                this["_" + propertyKey] = value;
                this.notify({
                    eventName: Observable.propertyChangeEvent,
                    propertyName: propertyKey,
                    object: this,
                    value,
                });
            },
            enumerable: true,
            configurable: true
        });
    };
}

/**
 * https://github.com/NickIliev/NativeScript-Cosmos-Databank/blob/master/app/views/helpers/files/file-helpers.ts
 * @param {Photo} photo
 */
export function savePhoto(url: string, photo: Photo): Promise<void> {

    const imageId = photo.id;
    return new Promise((resolve, reject) => {
        http.getImage(url)
            .then(function (res: ImageSource) {
                console.log("downloaded")
                try {
                    let fileName = imageId + '.jpeg';
                    let folderPath;

                    folderPath = galleryPath();


                    let _ = fileSystem.Folder.fromPath(folderPath);//create if missing

                    let filePath = fileSystem.path.join(folderPath, fileName);


                    console.log(filePath)
                    //todo refactor
                    if (!fileSystem.File.exists(filePath)) {

                        console.log("saving...")
                        let saved = res.saveToFile(filePath, "jpeg");
                        console.log("saved!!!")
                        if (saved) {
                            resolve()
                        } else {
                            reject(new Error("failed to save"))
                        }

                    } else {
                        reject(new Error("Path already exists"))
                    }
                } catch (err) {
                    console.error(err)
                    reject(err)
                }
            }, reject)
    })

}

function galleryPath() {
    let folderPath;
    if (application.android) {
        let androidDownloadsPath = android.os.Environment.getExternalStorageDirectory().getAbsolutePath().toString();
        folderPath = fileSystem.path.join(androidDownloadsPath, "Unsplash_Images");
    } else if (application.ios) {
        let iosDownloadPath = fileSystem.knownFolders.documents();
        folderPath = fileSystem.path.join(iosDownloadPath.path, "Unsplash_Images");
    }
    return folderPath
}