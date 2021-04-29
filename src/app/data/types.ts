export type SceneElement = {
  SceneData: {
    className: string;
    name: string;
  };
  SceneTexts?: {
    [key: string]: any;
  };
  SceneTables?: {
    [key: string]: any;
  };
  SceneImages?: {
    [key: string]: any;
  };
  SceneSVGs?: {
    [key: string]: any;
  };
  SceneVideos?: {
    [key: string]: any;
  };
};
