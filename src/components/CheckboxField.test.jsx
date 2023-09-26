import CheckboxField from "./CheckboxField";
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
  label: "string",
  field: { name: "string" },
  meta: {
    touched: true,
    error: true,
  },
};

const initialState = {};
const mockStore = configureStore();

test("render card field", () => {
  const store = mockStore(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <CheckboxField {...initData} />
      </Router>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
});
