export interface Post {
  title: string;
  author?: string;
  full_link?: string;
  url?: string;
  subreddit?: string;
  score?: number;
  num_comments?: number;
  preview?: ImagePreview;
}

interface ImagePreview {
  images: { resolutions: Resolution[] };
  source: Resolution;
}

interface Resolution {
  height: number;
  width: number;
  url: string;
}
