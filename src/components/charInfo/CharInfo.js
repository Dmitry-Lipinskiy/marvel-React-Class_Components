import { Component } from 'react';

import { MarvelService } from '../../services/marvelService/MarvelService';
import { Skeleton } from '../skeleton/Skeleton';
import { notImage } from '../../resources/data/not-image';
import { isErrorOrSpinner } from '../../resources/data/is-error-or-spinner';

import './charInfo.scss';

export class CharInfo extends Component {

  state = {
    char: null, // skeleton
    loading: false, // skeleton
    error: false
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  };

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  };

  updateChar = () => {
    const {charId} = this.props;
    if (!charId) {
      return;
    }

    this.onCharLoading();

    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false
    });
  };

  onCharLoading = () => {
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
    const { char, loading, error } = this.state

    const skeleton = char || loading || error ? null : <Skeleton />;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
      <div className='char__info'>
        {isErrorOrSpinner(loading, error)}
        {skeleton}
        {content}
      </div>
    );
  };
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  const isComicsList = (comics) => { 
    if (comics.length > 9) {
      return comics.slice(0, 9);
    } 
    return comics;
  };

  return (
    <>
      <div className='char__basics'>
        <img 
          src={thumbnail} 
          alt={name}
          style={{objectFit: (thumbnail === notImage) ? 'contain' : 'cover'}} 
        />
        <div>
          <div className='char__info-name'>{name}</div>
          <div className='char__btns'>
            <a href={homepage} className='button button__main'>
              <div className='inner'>homepage</div>
            </a>
            <a href={wiki} className='button button__secondary'>
              <div className='inner'>Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className='char__descr'>{description}</div>
      <div className='char__comics'>Comics:</div>
      <ul className='char__comics-list'>
        {comics.length > 0 ? null : 'There is no comics with this character'}
        {isComicsList(comics).map((item, i) => (
          <li key={i} className='char__comics-item'>{item.name}</li>
        ))}
      </ul>
    </>
  );
};
