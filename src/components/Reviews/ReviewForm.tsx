import React, { useEffect, useState } from "react";
import { createReview, NewReviewData } from "../../redux/slices/reviewSlice";
import { Button, Form } from "semantic-ui-react";
import { RootState, AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const ReviewForm: React.FC = () => {
  const { slug } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.data?.id;
  const username = auth.data?.username;

  const initialReviewState: NewReviewData = {
    userId: userId ?? "",
    username: username ?? "",
    skiAreaSlug: slug ?? "",
    header: "",
    body: "",
    stars: 0,
    photos: [],
    tags: [],
  };

  const [formData, setFormData] = useState(initialReviewState);
  const [photos, setPhotos] = useState(initialReviewState.photos);
  const [tags, setTags] = useState(initialReviewState.tags);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createReview(formData));

    setFormData(initialReviewState);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (index: number, value: string) => {
    if (formData.photos) {
      const updatedPhotoLinks = [...formData.photos];
      updatedPhotoLinks[index] = value;
      setPhotos(updatedPhotoLinks);
    }
  };

  const handleAddPhotoInput = () => {
    if (formData.photos) {
      setPhotos([...formData.photos, ""]);
    }
  };

  const handleRemovePhotoInput = (index: number) => {
    if (formData.photos) {
      const updatedPhotoLinks = [...formData.photos];
      updatedPhotoLinks.splice(index, 1);
      setPhotos(updatedPhotoLinks);
    }
  };
};
