import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AppHeader } from '../appHeader';
import { ComicsPage } from '../pages/comicsPage';
import { MainPage } from '../pages/mainPage';
import { Page404 } from '../pages/page404/Page404';
import { SingleComicPage } from '../pages/singleComicPage/SingleComicPage';

export class App extends Component {

  state = {
    selectedComic: null
  };

  onComicSelected = (id) => {
    this.setState({
      selectedComic: id
    });
  };

  render = () => (
    <Router>
      <div className='app'>
        <AppHeader />
        <main>
          <Switch>
            <Route exact path='/'>
              <MainPage />
            </Route>
            <Route exact path='/comics'>
              <ComicsPage onComicSelected={this.onComicSelected} />
            </Route>
            <Route exact path='/comics/:comicId'>
              <SingleComicPage comicId={this.state.selectedComic} />
            </Route>
            <Route path='*'>
              <Page404 />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

