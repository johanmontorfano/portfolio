import { FirebaseAppInstance } from "..";

const ImagesGSBucketURLs = {
  me1: "gs://portfolio-ccddc.appspot.com/portfolio-images/me1.jpg",
  me2: "gs://portfolio-ccddc.appspot.com/portfolio-images/me2.jpg",
  the_desktop:
    "gs://portfolio-ccddc.appspot.com/portfolio-images/the_desktop.jpg",
  memoji: "gs://portfolio-ccddc.appspot.com/portfolio-images/memoji.png",
};

export const resolveImage = async (url: "me1" | "me2" | "the_desktop" | "memoji"): Promise<string> => {
    const _url = await FirebaseAppInstance.storage().refFromURL(ImagesGSBucketURLs[url]).getDownloadURL();
    return _url;
};
