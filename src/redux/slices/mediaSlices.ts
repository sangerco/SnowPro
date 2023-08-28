import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../utils/config";

export interface NewPhotoData {
  userId: string;
  link: string;
  about: string;
  tagIds: string[];
}

export interface PhotoData {
  id: string;
  userId: string;
  link: string;
  about: string;
  tagIds: string[];
  createdAt: Date;
}

export interface NewVideoData {
  userId: string;
  link: string;
  about: string;
  tagIds: string[];
}

export interface VideoData {
  id: string;
  userId: string;
  link: string;
  about: string;
  tagIds: string[];
  createdAt: Date;
}

interface MediaState {
  photo: PhotoData | null;
  photos: PhotoData[] | [];
  video: VideoData | null;
  videos: VideoData[] | [];
  loading: boolean;
  error: string | null;
}

const initialState: MediaState = {
  photo: null,
  photos: [],
  video: null,
  videos: [],
  loading: false,
  error: null,
};

export const createPhoto = createAsyncThunk(
  "media/createPhoto",
  async (photoData: NewPhotoData) => {
    const response = await axios.post(`${URL}/api/photos`, photoData);
    const photo = response.data.photo;
    return photo;
  }
);

export const fetchPhoto = createAsyncThunk(
  "media/fetchPhoto",
  async (id: string) => {
    const response = await axios.get(`${URL}/photo/${id}`);
    const photo = response.data.photo;
    return photo;
  }
);

export const fetchPhotosByUsername = createAsyncThunk(
  "media/fetchPhotosByUsername",
  async (username: string) => {
    const response = await axios.get(`${URL}/users/${username}/photos`);
    const photos = response.data.photos;
    return photos;
  }
);

export const updatePhoto = createAsyncThunk(
  "media/updatePhoto",
  async (updatePhotoData: PhotoData) => {
    const response = await axios.patch(
      `${URL}/api/photo/${updatePhotoData.id}`
    );
    const photo = response.data.photo;
    return photo;
  }
);

export const deletePhotoByUserIdAndLink = createAsyncThunk(
  "media/deletePhotoByUserIdAndLink",
  async (photoData: PhotoData) => {
    await axios.delete(`${URL}/photo/${photoData.id}/${photoData.link}`);
    return null;
  }
);

export const deletePhoto = createAsyncThunk(
  "media/deletePhoto",
  async (id: string) => {
    await axios.delete(`${URL}/api/photo/${id}`);
    return null;
  }
);

export const createVideo = createAsyncThunk(
  "media/createVideo",
  async (videoData: NewVideoData) => {
    const response = await axios.post(`${URL}/api/videos`, videoData);
    const video = response.data.video;
    return video;
  }
);

export const fetchVideo = createAsyncThunk(
  "media/fetchVideo",
  async (id: string) => {
    const response = await axios.get(`${URL}/video/${id}`);
    const video = response.data.video;
    return video;
  }
);

export const fetchVideosByUsername = createAsyncThunk(
  "media/fetchVideosByUsername",
  async (username: string) => {
    const response = await axios.get(`${URL}/users/${username}/videos`);
    const videos = response.data.videos;
    return videos;
  }
);

export const updateVideo = createAsyncThunk(
  "media/updateVideo",
  async (updateVideoData: VideoData) => {
    const response = await axios.patch(
      `${URL}/api/video/${updateVideoData.id}`
    );
    const video = response.data.video;
    return video;
  }
);

export const deleteVideo = createAsyncThunk(
  "media/deleteVideo",
  async (id: string) => {
    await axios.delete(`${URL}/api/video/${id}`);
    return null;
  }
);

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createPhoto.fulfilled,
        (state, action: PayloadAction<PhotoData>) => {
          state.photo = action.payload;
          state.loading = false;
        }
      )
      .addCase(createPhoto.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPhoto.fulfilled,
        (state, action: PayloadAction<PhotoData>) => {
          state.photo = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchPhoto.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPhotosByUsername.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPhotosByUsername.fulfilled,
        (state, action: PayloadAction<PhotoData[]>) => {
          state.photos = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchPhotosByUsername.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(updatePhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updatePhoto.fulfilled,
        (state, action: PayloadAction<PhotoData>) => {
          state.photo = action.payload;
          state.loading = false;
        }
      )
      .addCase(updatePhoto.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePhoto.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletePhoto.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePhotoByUserIdAndLink.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePhotoByUserIdAndLink.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(
        deletePhotoByUserIdAndLink.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(
        createVideo.fulfilled,
        (state, action: PayloadAction<VideoData>) => {
          state.video = action.payload;
          state.loading = false;
        }
      )
      .addCase(createVideo.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchVideo.fulfilled,
        (state, action: PayloadAction<VideoData>) => {
          state.video = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchVideo.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchVideosByUsername.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchVideosByUsername.fulfilled,
        (state, action: PayloadAction<VideoData[]>) => {
          state.photos = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchVideosByUsername.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(updateVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateVideo.fulfilled,
        (state, action: PayloadAction<VideoData>) => {
          state.video = action.payload;
          state.loading = false;
        }
      )
      .addCase(updateVideo.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteVideo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteVideo.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mediaSlice.reducer;