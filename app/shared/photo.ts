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

}