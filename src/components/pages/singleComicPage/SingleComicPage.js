import { Component } from 'react';
import { Link } from 'react-router-dom';

import { MarvelService } from '../../../services/marvelService/MarvelService';
import { isErrorOrSpinner } from '../../../resources/data/is-error-or-spinner';
import { AppBanner } from '../../appBanner';

import './singleComicPage.scss';

export class SingleComicPage extends Component {

  state = {
    comic: null, 
    loading: false,
    error: false
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateComic();
  };

  updateComic = () => {
    const {comicId} = this.props;
    if (!comicId) {
      return;
    }

    this.onComicLoading();

    this.marvelService
      .getComic(comicId)
      .then(this.onComicLoaded)
      .catch(this.onError);
  };

  onComicLoaded = (comic) => {
    this.setState({
      comic,
      loading: false
    });
  };

  onComicLoading = () => {
    this.setState({
      loading: true
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true
    });
  };

  render = () => { 
    const { comic, loading, error } = this.state

    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
      <>
        {isErrorOrSpinner(loading, error)}
        {content}
      </>
    );
  };
};

const View = ({ comic }) => {

  const { title, description, pageCount, thumbnail, language, price } = comic;

  return (
    <>
      <AppBanner />
      <div className='single-comic'>
        <img src={thumbnail} alt={title} className='single-comic__img' />
        <div className='single-comic__info'>
          <h2 className='single-comic__name'>{title}</h2>
          <p className='single-comic__descr'>{description}</p>
          <p className='single-comic__descr'>{pageCount}</p>
          <p className='single-comic__descr'>Language: {language}</p>
          <div className='single-comic__price'>{price}</div>
        </div>
        <Link to='/comics' className='single-comic__back'>
          Back to all
        </Link>
      </div>
    </>
  );
};

