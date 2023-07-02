import { Extension } from "./getColorByExtension";

export const getExtensionFromFilename = (filename: string) => {
    return filename.split('.').pop() as Extension;
}