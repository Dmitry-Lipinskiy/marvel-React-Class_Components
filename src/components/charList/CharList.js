import { Component } from 'react';

import { MarvelService } from '../../services/marvelService/MarvelService';
import { isErrorOrSpinner } from '../../resources/data/is-error-or-spinner';

import './charList.scss';

export class CharList extends Component {

  state = {
    charList: [],
    loading: true,
    error: false,
    offset: 210,
    newItemLoading: false,
    charEnded: false,
    index: null
  }

  ref = [];
  
  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  };

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError)
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true
    });
  };

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    this.setState(({offset, charList}) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended
    }));
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true
    });
  };

  setRef = (el) => {
    this.ref.push(el);
  };

  changeStyleCharSelected = (id, index) => {
    this.props.onCharSelected(id);

    if (this.ref[index]) {
      this.ref[index].classList.add('char__item_selected');
    }

    this.setState({index});

    if (this.ref[this.state.index]) {
      this.ref[this.state.index].classList.remove('char__item_selected');
    }
  }

  charListItems = (charList) => (
    <ul className='char__grid'>
      {charList.map((item, index) => (
        <li 
          className='char__item'
          key={item.id}
          ref={this.setRef}
          onClick={() => this.changeStyleCharSelected(item.id, index)}
        >
          <img 
            src={item.thumbnail} 
            alt={item.name} 
          />
          <div className='char__name'>{item.name}</div>
        </li>
      ))}
    </ul>
  );
  
  render = () => {
    const { charList, loading, error, newItemLoading, charEnded, offset } = this.state;

    const charListItems = this.charListItems(charList);

    const content = !(loading || error) ? charListItems : null;

    return (
      <div className='char__list'>
        {isErrorOrSpinner(loading, error)}
        {content}
        <button className='button button__main button__long'
          disabled={newItemLoading}
          style={{display: charEnded ? 'none' : 'block'}}
          onClick={() => this.onRequest(offset)}
        >
          <div className='inner'>load more</div>
        </button>
      </div>
    );
  };
};


