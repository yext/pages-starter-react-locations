type Thumbnail = {
  height: number;
  width: number;
  url: string;
};

type Image = {
  height?: number;
  width?: number;
  url: string;
  thumbnails?: Thumbnail[];
};

type PhotoGallery = {
  photoGallery: Image[];
};

const renderImages = (photoGallery: PhotoGallery) => {
  for (const [k, v] of Object.entries(photoGallery)) {
    console.log();
  }
};

const PhotoGallery = (props: PhotoGallery) => {
  const { photoGallery } = props;
  renderImages(props);
  return (
    <div>
      {photoGallery.map((image, index) => (
        <img src={image.url} key={index} />
      ))}
    </div>
  );
};

export default PhotoGallery;
