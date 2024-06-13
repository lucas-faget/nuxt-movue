import { BackdropSize } from "~/types/BackdropSize";
import { PosterSize } from "~/types/PosterSize";

export default defineNuxtPlugin((): any => {
    const { $apiConfig } = useNuxtApp();

    const apiImgBaseUrl: string = $apiConfig.apiImgBaseUrl;

    const getBackdropUrl = (path: string, size: BackdropSize = BackdropSize.W780): string => {
        return `${apiImgBaseUrl}/${size}/${path}`;
    };

    const getPosterUrl = (path: string, size: PosterSize = PosterSize.W154): string => {
        return `${apiImgBaseUrl}/${size}/${path}`;
    };

    return {
        provide: {
            images: {
                getBackdropUrl,
                getPosterUrl,
            },
        },
    };
});
