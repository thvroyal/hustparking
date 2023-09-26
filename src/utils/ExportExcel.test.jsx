import Enzyme, { mount } from 'enzyme';
import ExportExcel from './ExportExcel';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

const initialState = { 
    children: 'string',
    name: 'string',
    dataSet: ['string', 'string'],
 };

test('render app', () => {
  const wrapper = mount(<ExportExcel {...initialState}/>
  );
  expect(wrapper).toBeTruthy();
});
