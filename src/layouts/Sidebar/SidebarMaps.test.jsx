import SideBarMaps from "./SidebarMaps";
import Enzyme, { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

const initProps = {
  toggle: true,
  id: 65,
  listFields: {
    listOfFields: [
      {
        id: 65,
        name: "string",
        openstatus: 1,
        price: 2000,
        totalBook: 1,
        busySlot: 2,
        totalSlot: 4,
        details: "string",
      },
    ],
  },
};

const initialState = {};
const mockStore = configureStore();

test("render app", () => {
  const store = mockStore(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <SideBarMaps {...initProps} />
      </Router>
    </Provider>
  );
  expect(wrapper).toBeTruthy();
});
