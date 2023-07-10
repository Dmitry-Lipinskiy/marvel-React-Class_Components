import { Component } from 'react';

import { MarvelService } from '../../services/marvelService/MarvelService';
import { notImage } from '../../resources/data/not-image';
import { isErrorOrSpinner } from '../../resources/data/is-error-or-spinner';

import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';

export class RandomChar extends Component {

  state = {
    char: {},
    loading: true,
    error: false
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
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

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    this.onCharLoading();

    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render = () => {
    const {char, loading, error} = this.state

    const content = !(loading || error) ? <View char={char} /> : null;

    return (
      <div className='randomchar'>
        {isErrorOrSpinner(loading, error)}
        {content}
        <div className='randomchar__static'>
          <p className='randomchar__title'>
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className='randomchar__title'>Or choose another one</p>
          <button className='button button__main'>
            <div className='inner' onClick={this.updateChar}>try it</div>
          </button>
          <img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
        </div>
      </div>
    );
  };
};

const View = ({ char }) => {
  const {name, description, thumbnail, homepage, wiki} = char;

  const isDescription = (description) => {
    if (description === '') {
      return 'There is no description for this character.';
    }  
    if (description.length >= 210) {
      return description.slice(0, 210) + '...';
    } 
    return description;
  };

  return (
    <div className='randomchar__block'>
      <img 
        src={thumbnail} 
        alt={name} 
        className='randomchar__img'
        style={{objectFit: (thumbnail === notImage) ? 'contain' : 'cover'}} 
      />
      <div className='randomchar__info'>
        <p className='randomchar__name'>{name}</p>
        <p className='randomchar__descr'>{isDescription(description)}</p>
        <div className='randomchar__btns'>
          <a href={homepage} className='button button__main'>
            <div className='inner'>homepage</div>
          </a>
          <a href={wiki} className='button button__secondary'>
            <div className='inner'>Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};