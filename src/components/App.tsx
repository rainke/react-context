import * as React from 'react';
import AppRouter from '../routes/router';
import {BrowserRouter as Router} from 'react-router-dom';

const app = {
  display: 'flex',
  height: '100%'
}
const aside = {
  width: 200,
  backgroundColor: '#333',
  color: '#fff'
}
const right = {
  flex: 1,
  overflow: 'hidden'
};

export default class App extends React.Component {
  render(): JSX.Element {
    return (
      <Router>
        <div style={app}>
          <aside style={aside}>侧边</aside>
          <div style={right}>
            <header>顶部</header>
            <section className="content">
              <AppRouter />
            </section>
          </div>
        </div>
      </Router>
    );
  }
}
