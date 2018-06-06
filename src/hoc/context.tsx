import * as React from 'react';

const {Fragment} = React;

const context = React.createContext(null);
const {Provider, Consumer} = context;

export interface ConnectProps {
  getState: any;
  dispatch: any;
  actions: any;
  subscribe: any;
}
export interface ConnectState {
  state: any;
  actions: any;
}

const createActions = ({actions, dispatch}) => {
  let rstActions = {};
  for( let key in actions) {
    const action = actions[key];
    rstActions[key] = () => {
      action(dispatch);
    }
  }
  return rstActions;
};

const connect = (option={}) => Target => {
  class Connect extends React.Component<ConnectProps, ConnectState> {
    private unsubscribe: () => any;

    constructor(props) {
      super(props);
      this.state = {
        state: props.getState(),
        actions: createActions(this.props)
      };
      this.unsubscribe = props.subscribe(this.subscribe);
    }

    subscribe = () => {
      this.setState({
        state: this.props.getState()
      })
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    public render() {
      const {state, actions} = this.state;
      return (
        <Target {...state} {...actions}/>
      );
    }
  }

  return props => (
    <Consumer>
      {store => (
        <Connect {...store} />
      )}
    </Consumer>
  );
};

export interface storeOptions {
  state: any;
  reducers: object;
  actions: any;
}

const createStore = (options: storeOptions) => {
  const {state = {}, reducers, actions} = options;
  const listeners = [];
  const dispatch = reducer => {
    reducers[reducer](state);
    listeners.forEach(listener => listener())
  };
  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      const index = listeners.findIndex(l => l === listener);
      listeners.splice(index, 1);
    }
  }

  const getState = () => state;

  return {actions, getState, dispatch, subscribe}
};

export {Provider, connect, createStore};