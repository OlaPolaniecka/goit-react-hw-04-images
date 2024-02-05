import Searchbar from './components/Searchbar';
import axios from 'axios';
import Button from 'components/Button';
import ImageGallery from 'components/ImageGallery';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import { useState, useEffect, useToggleModal } from 'react';

const App = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [lastSearchQuery, setLastSearchQuery] = useState('');

  const API_KEY = '41147953-e12c65c5a5e41658f9ab5f6ec';

  const toggleModal = useToggleModal(
    image => {
      setSelectedImage(image);
      setIsModalOpen(!isModalOpen);
    },
    [isModalOpen]
  );

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape' && isModalOpen) {
        toggleModal();
      }
    };
    setShowLoadMore(Math.ceil(total / 12) > 1);

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, toggleModal, total]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get('https://pixabay.com/api/', {
          params: {
            q: lastSearchQuery,
            page: page,
            key: API_KEY,
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
          },
        });

        setResults(prevResults => [...prevResults, ...response.data.hits]);
        setTotal(Math.ceil(response.data.totalHits / 12));

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, lastSearchQuery]);

  const handleSubmit = async query => {
    setLastSearchQuery(query);
  };

  const handleLoadMore = async () => {
    setPage(page + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery>
          {results &&
            results.map(result => (
              <ImageGalleryItem
                onClick={() => toggleModal(result.largeImageURL)}
                key={result.id}
                src={result.webformatURL}
                description={result.description}
              />
            ))}
        </ImageGallery>
      )}
      {showLoadMore && (
        <Button
          nextPage={handleLoadMore}
          className={'load-more'}
          type="button"
          label="Load more"
        />
      )}
      {isModalOpen && <Modal imageURL={selectedImage} />}
    </>
  );
};

export default App;
