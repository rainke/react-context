import * as React from 'react';
import {Provider, connect, createStore} from '../hoc/context';

interface ContentProps {
  add: any;
  count: number;
}

class Content extends React.Component<ContentProps> {
  render() {
    return <button onClick={this.props.add} >add {this.props.count}</button>;
  }
}

const C = connect()(Content)
C.displayName = 'wrapedContent';

interface HomeState {
  count: number
}

const store = createStore({
  state: {count: 0},
  reducers: {
    add: state => {
      state.count += 1;
    }
  },
  actions: {
    add: dispatch => {
      setTimeout(() => {
        dispatch('add')
      }, 1000)
    }
  }
});


class Home extends React.Component<{}, HomeState> {

  public render() {
    return (
      <Provider value={store}>
        <C />
        <C />
      </Provider>
    );
  }
}

export default Home;
