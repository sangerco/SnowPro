export interface AllSkiAreasData {
  slug: string;
  name: string;
}

export interface SkiAreaData {
  slug: string;
  name: string;
  country: string;
  region: string;
  href: string;
  location: {
    latitude: number;
    longitude: number;
  };
  lifts: {
    status: { [key: string]: any };
    stats: { [key: string]: any };
  };
  twitter: {
    user: string;
    tweets: any[];
  };
}

export interface SkiAreaReviewData {
  slug: string;
  name: string;
  userId: string;
  body: string;
  stars: number;
  photos: string;
  tagIds: string[];
  tags: string[];
}

export interface SkiAreaReviewDataReturn {
  id: string;
  userId: string;
  username: string;
  skiAreaSlug: string;
  skiAreaName: string;
  body: string;
  stars: number;
  photos: string[];
  tags: string[];
}

export interface SkiAreasUsersFavoritedBy {
  slug: string;
  user_ids: string[];
  usernames: string[];
}
