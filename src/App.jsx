import "./App.css";
import { useEffect, useState } from "react";
import SearchBar from "./components/searchBar/SearchBar";
import ImageGallery from "./components/imageGallery/ImageGallery";
import Loader from "./components/loader/Loader";
import { fetchImages } from "./images-api";
import ImageModal from "./components/imageModal/ImageModal";
import LoadMoreBtn from "./components/loadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/errorMessage/ErrorMessage";

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [urlImgModal, setUrlImgModal] = useState("");
  const [altImgModal, setAltImgModal] = useState("");
  const [description, setDescription] = useState("");
  const [likes, setLikes] = useState("");
  const [user, setUser] = useState("");
  const [userLoc, setUserLoc] = useState("");

  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { results, total_pages } = await fetchImages(query, page);
        if (!results.length) {
          setIsEmpty(true);
          return;
        }
        setImages((prevImages) => [...prevImages, ...results]);
        setIsVisible(page < total_pages);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, query]);

  const onHandleSubmit = (value) => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setIsEmpty(false);
    setError(false);
    setIsVisible(false);
  };

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (url, alt, likes, description, user, userLoc) => {
    setShowModal(true);
    setAltImgModal(alt);
    setUrlImgModal(url);
    setDescription(description);
    setLikes(likes);
    setUser(user);
    setUserLoc(userLoc);
  };

  const closeModal = () => {
    setShowModal(false);
    setAltImgModal("");
    setUrlImgModal("");
    setDescription("");
    setLikes("");
    setUser("");
    setUserLoc("");
  };

  return (
    <>
      <SearchBar onSubmit={onHandleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isLoading && <Loader />}
      {isVisible && (
        <LoadMoreBtn onClick={onLoadMore} disabled={isLoading}>
          {isLoading ? "Loading" : "Load More"}
        </LoadMoreBtn>
      )}
      {error && <ErrorMessage>❌ Something went wrong</ErrorMessage>}
      {isEmpty && (
        <ErrorMessage>Sorry. There are no images ... 😭</ErrorMessage>
      )}
      <ImageModal
        url={urlImgModal}
        alt={altImgModal}
        likes={likes}
        user={user}
        userLoc={userLoc}
        description={description}
        modalIsOpen={showModal}
        closeModal={closeModal}
      />
    </>
  );
};

export default App;
