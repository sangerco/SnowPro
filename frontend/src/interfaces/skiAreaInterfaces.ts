export interface SkiAreaProps {
    slug: string;
    name: string;
    country: string;
    region: string;
    lat: number;
    long: number;
    url: string
};

export interface SkiAreaData {
    data: {
        slug: string;
        name: string;
        country: string;
        region: string;
        href: string;
        units: 'imperial' | 'metric'; 
    
        location: {
            latitude: number;
            longitude: number;
        };
    
        lifts: {
            status: {
                [liftName: string]: 'open' | 'closed' | 'hold' | 'scheduled';
            };
            stats: {
                open: number;
                hold: number;
                scheduled: number;
                closed: number;
                percentage: {
                    open: number;
                    closed: number;
                    hold: number;
                    scheduled: number;
                };
            };
        };
    
        reviewData: {
            slug: string;
            name: string;
            userId: string | null;
            skiAreaSlug: string | null;
            body: string | null;
            stars: number | null;
            photos: string[] | null; 
            tagIds: string[] | null; 
            tags: string[] | null; 
        }[];
    
        usersFavoritedBy: {
            slug: string;
            userId: string | null;
            username: string | null;
        }[];
    };
};

export interface SkiResort {
    slug: string;
    name: string;
    country: string;
    region: string;
    location: {
      latitude: number;
      longitude: number;
    };
    url: string;
};

export interface SkiResortDataResponse {
    object: {
      page: number;
      per_page: number;
      pre_page: null;
      next_page: number;
      total: number;
      total_pages: number;
    };
    data: SkiResort[];
};
