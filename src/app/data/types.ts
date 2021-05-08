export type PageElement = {
  PageData: {
    className: string;
    name: string;
  };
  PageValues?: {
    [key: string]: any;
  }
  PageTexts?: {
    [key: string]: any;
  };
  PageTables?: {
    [key: string]: any;
  };
  PageImages?: {
    [key: string]: any;
  };
  PageSVGs?: {
    [key: string]: any;
  };
  PageVideos?: {
    [key: string]: any;
  };
};
