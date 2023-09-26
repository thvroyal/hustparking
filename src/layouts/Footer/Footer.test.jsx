import Enzyme, { mount } from 'enzyme';
import Footer from './Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

test('render app', () => {
  const wrapper = mount(
    <Router>
      <Footer />
    </Router>
  );
  expect(wrapper).toBeTruthy();
});
