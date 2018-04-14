import * as platform from "tns-core-modules/platform";

type url = string
export type PhotoSize = "raw" | "full" | "regular" | "small" | "thumb"

export interface Photo {
    id: string

    width: number
    height: number

    likes: number

    authorName: string
    authorHandle: string

    // urls: { raw: string, full: string, regular: string, small: string, thumb: string }
    urls: { [s in PhotoSize] : string}
    download_link: url
}

export class PhotoUtils {

    /**
     *  Given a raw photo link, append to it more url args to specify the requested
     *  width, height, quality, etc of the image. This way no processing is needed on the device
     *  as the image is already in correct size.
     * @param url a canonical link (i.e. https://images.unsplash.com/photo-1523564146079-b3fc6d3d2e32?x=1)
     * @param opts
     *  - keepRatio - if true, the image will keep its original aspect ratio if true
     *  - reducedQuality - if true, request image with reduced quality to speed up the request
     * @return {string}
     */
    public static prepareImageLink(url, opts: { keepRatio: boolean, reducedQuality: boolean }) {

        let options = {
            keepRatio: false,
            reducedQuality: true,
            ...opts
        };
        let w = platform.screen.mainScreen.widthPixels;
        let h = platform.screen.mainScreen.heightPixels;
        let unsplashOptions = {
            w: w
        };
        if (!options.keepRatio) {
            unsplashOptions['h'] = w;
            unsplashOptions['fit'] = 'crop';
            unsplashOptions['crop'] = 'entropy'
        }
        if (options.reducedQuality) {
            unsplashOptions['q'] = '0.1';
        }

        let urlArgs: string = Object.keys(unsplashOptions).reduce(((previousValue, currentValue) => {
            return `${previousValue}&${currentValue}=${unsplashOptions[currentValue]}`
        }), "");

        let result = url;
        if (url.indexOf("?") !== -1) {
            result = `${result}${urlArgs}`
        } else {
            result = `${result}?${urlArgs}`
        }

        console.log(result);
        return result
    }

    public static calculateImageWidth(raw_size) {
        return `${platform.screen.mainScreen.widthPixels}`
    }

    public static calculateImageHeight(raw_size) {
        return `${platform.screen.mainScreen.widthPixels}`
    }
}