import { shallow } from 'enzyme';
import PageNotFound from './404';
import { configure } from 'enzyme';
import * as router from 'react-router';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

beforeEach(() => {
  const historyHistory= {
      goBack: jest.fn(),
  }; 
  jest.spyOn(router, 'useHistory').mockImplementation(() =>historyHistory);// try to mock hook
});

test('render page', () => {
  const wrapper = shallow(<PageNotFound />);
  const btn = wrapper.find("button").first();
  btn.simulate("click");
  expect(wrapper).toBeTruthy();
});
