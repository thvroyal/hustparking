import SwitchToggle from "./SwitchToggle";
import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });


const initData = {
    onChecked: jest.fn(),
    onUnchecked: jest.fn(),
    scale: 1,
    toggled: true,

};

const initialState = {};
const mockStore = configureStore();

test("render card field", () => {
  const store = mockStore(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <SwitchToggle {...initData} />
      </Router>
    </Provider>
  );
    const input = wrapper.find("input").first();
    input.simulate("change");
  expect(wrapper).toBeTruthy();
});

test("render card field", () => {
    const newData = {
        ...initData,
        toggled: false,
    }
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <SwitchToggle {...newData} />
        </Router>
      </Provider>
    );
      const input = wrapper.find("input").first();
      input.simulate("change");
    expect(wrapper).toBeTruthy();
  });
