import { Component } from 'react';
import { Link } from 'react-router-dom';

import { isErrorOrSpinner } from '../../resources/data/is-error-or-spinner';
import { MarvelService } from '../../services/marvelService/MarvelService';

import './comicsList.scss';

export class ComicsList extends Component {

  state = {
    comicsList: [],
    loading: true,
    error: false,
    offset: 0,
    newItemLoading: false,
    comicsEnded: false,
  }
  
  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  };

  onRequest = (offset) => {
    this.onComicsListLoading();
    this.marvelService
      .getAllComics(offset)
      .then(this.onComicsListLoaded)
      .catch(this.onError)
  };

  onComicsListLoading = () => {
    this.setState({
      newItemLoading: true
    });
  };

  onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }
    this.setState(({offset, comicsList}) => ({
      comicsList: [...comicsList, ...newComicsList],
      loading: false,
      newItemLoading: false,
      offset: offset + 8,
      comicsEnded: ended
    }));
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true
    });
  };

  comicsListItems = (comicsList) => (
    <ul className='comics__grid'>
      {comicsList.map((item, i) => (
        <li 
          className='comics__item'
          key={i}
          onClick={() => this.props.onComicSelected(item.id)}
        >
          <Link to={`/comics/${item.id}`}>
            <img 
              src={item.thumbnail} 
              alt={item.title} 
              className='comics__item-img' 
            />
            <div className='comics__item-name'>
              {item.title}
            </div>
            <div className='comics__item-price'>
              {item.price}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  render = () => {
    const { comicsList, loading, error, newItemLoading, comicsEnded, offset } = this.state;

    const comicsListItems = this.comicsListItems(comicsList);

    const content = !(loading || error) ? comicsListItems : null;

    return (
      <div className='comics__list'>
        {isErrorOrSpinner(loading, error)}
        {content}
        <button className='button button__main button__long'
          disabled={newItemLoading}
          style={{display: comicsEnded ? 'none' : 'block'}}
          onClick={() => this.onRequest(offset)}
        >
          <div className='inner'>load more</div>
        </button>
      </div>
    );
  };
};

