import { Component } from "react";

import { RandomChar } from "../../randomChar";
import { CharList } from "../../charList";
import { CharInfo } from "../../charInfo";

import decoration from '../../../resources/img/vision.png';

export class MainPage extends Component {

  state = {
    selectedChar: null
  };

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id
    });
  };

  render = () => (
    <>
      <RandomChar />
      <div className='char__content'>
        <CharList onCharSelected={this.onCharSelected} />
        <CharInfo charId={this.state.selectedChar} />
      </div>
      <img className='bg-decoration' src={decoration} alt='vision' />
    </>
  );
};
