/* eslint-disable jsx-quotes */
import React, { Component, Fragment } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import Loading from '../../components/Loading';
import '../../scss/app.scss';
import Router from './Router';
import store from '../../store/store';
import ScrollToTop from './ScrollToTop';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loaded: false,
    };
  }

  componentDidMount() {
    window.addEventListener('load', () => {
      this.setState({ loading: false });
      setTimeout(() => this.setState({ loaded: true }), 500);
    });
  }

  render() {
    const { loaded, loading } = this.state;
    return (
      <Provider store={store.store}>
        <PersistGate loading={<Loading />} persistor={store.persistor}>
          <BrowserRouter>
            <ScrollToTop>
              <Fragment>
                {!loaded && (
                  <div className={`load${loading ? '' : ' loaded'}`}>
                    <div className='load__icon-wrap'>
                      <svg className='load__icon'>
                        <path
                          fill='#4ce1b6'
                          d='M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z'
                        />
                      </svg>
                    </div>
                  </div>
                )}
                <div>
                  <Router />
                  <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
                </div>
              </Fragment>
            </ScrollToTop>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default hot(module)(App);
