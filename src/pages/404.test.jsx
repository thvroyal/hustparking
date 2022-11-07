import { shallow } from 'enzyme';
import PageNotFound from './404';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('render page', () => {
  const wrapper = shallow(<PageNotFound />);
  expect(wrapper).toBeTruthy();
});
