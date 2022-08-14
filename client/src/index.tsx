import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { GlobalStyle } from './global.style';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppRouter from './components/AppRouter';

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <>
    <Provider store={store}>
      <GlobalStyle />
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        rtl={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AppRouter />
    </Provider>
  </>,
);
