export type VideoPlayerInstanceData = {
  isVideoLoaded: boolean;
};


//FIX LATER PROBLEM: Unable to use (entry is HTMLVideoElement) because it makes a missing semicolon error
export const IsVideoElement = (entry: any): HTMLVideoElement | undefined => {
  //use a unique entry of a video element to define if it's a video element
  return entry.readyState !== undefined? entry : undefined;
};
