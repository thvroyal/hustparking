import SlotFiledC9 from "./SlotFiledC9";
import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import * as formik from "formik";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useField: jest.fn((props) => {
    return [props.field, props.meta]
  }),
}));

const initData = {
    className: "string",
    id: 65,
    stateSlot: true,
    check: true,
    listSlots: [],
};

const initialState = {};
const mockStore = configureStore();

test("render card field", () => {
  const store = mockStore(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <SlotFiledC9 {...initData} />
      </Router>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
});

test("render card field 1", () => {
    const newData = {
        ...initData,
        stateSlot: true,
        check: false,
    }
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <SlotFiledC9 {...newData} />
        </Router>
      </Provider>
    );
  
    expect(wrapper).toBeTruthy();
  });

  test("render card field 2", () => {
    const newData = {
        ...initData,
        stateSlot: false,
        check: true,
    }
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <SlotFiledC9 {...newData} />
        </Router>
      </Provider>
    );
  
    expect(wrapper).toBeTruthy();
  });

  test("render card field 3", () => {
    const newData = {
        ...initData,
        stateSlot: false,
        check: false,
    }
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <SlotFiledC9 {...newData} />
        </Router>
      </Provider>
    );
  
    expect(wrapper).toBeTruthy();
  });
