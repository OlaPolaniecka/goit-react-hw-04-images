import Searchbar from './components/Searchbar';
import axios from 'axios';
import Button from 'components/Button';
import ImageGallery from 'components/ImageGallery';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
      isModalOpen: false,
      selectedImage: null,
      showLoadMore: false,
      page: 1,
      total: 0,
      lastSearchQuery: '',
    };
    this.API_KEY = '41147953-e12c65c5a5e41658f9ab5f6ec';
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.total !== prevState.total ||
      this.state.results !== prevState.results
    ) {
      this.setState({ showLoadMore: Math.ceil(this.state.total / 12) > 1 });
    }
  }

  handleKeyDown = event => {
    if (event.key === 'Escape' && this.state.isModalOpen) {
      this.toggleModal();
    }
  };

  fetchData = async query => {
    try {
      this.setState({ isLoading: true });
      const res = await axios.get('https://pixabay.com/api/', {
        params: {
          q: query,
          page: this.state.page,
          key: this.API_KEY,
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: 12,
        },
      });
      this.setState({
        isLoading: false,
        results: [...res.data.hits, ...this.state.results],
        total: Math.ceil(res.data.totalHits / res.config.params.per_page),
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  handleSubmit = async query => {
    this.setState({ lastSearchQuery: query, results: [] });
    await this.fetchData(query);
  };

  toggleModal = image => {
    this.setState({
      selectedImage: image,
      isModalOpen: !this.state.isModalOpen,
    });
  };

  handleLoadMore = async () => {
    await this.fetchData(this.state.lastSearchQuery);
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { isLoading, results, showLoadMore, isModalOpen, selectedImage } =
      this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery>
            {results &&
              results.map(result => (
                <ImageGalleryItem
                  onClick={() => this.toggleModal(result.largeImageURL)}
                  key={result.id}
                  src={result.webformatURL}
                  description={result.description}
                />
              ))}
          </ImageGallery>
        )}
        {showLoadMore && (
          <Button
            nextPage={this.handleLoadMore}
            className={'load-more'}
            type="button"
            label="Load more"
          />
        )}
        {isModalOpen && <Modal imageURL={selectedImage} />}
      </>
    );
  }
}

export default App;
