import React from 'react';
import { Button } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import Invitation from './components/Invitation';

class App extends React.Component {
  render() {
    return (
      <div className="layout">
        <Header />
        <div className="content">
          <div className="slogan">
            <div className="title">A better way</div>
            <div className="title">to enjoy every day.</div>
            <span className="smallText">Be the first know when we launch.</span>
            <div className="inviteBtn">
              <Invitation />
            </div>

          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;
