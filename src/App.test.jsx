import Enzyme, { mount } from 'enzyme';
import * as ReactRedux from 'react-redux';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

beforeAll(() => {
  ReactRedux.useDispatch = jest.fn();
});

const initialState = { auth: { loading: true } };
const mockStore = configureStore();

test('render app', () => {
  const store = mockStore(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(wrapper).toBeTruthy();
});
