import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Contracts from "./Contracts";
import thunk from "redux-thunk";
import { act } from "@testing-library/react";
Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initData = {};
const initialState = {
  listContract: {
    loading: false,
    listContract: [
      {
        fieldId: 1,
        status: "V",
      },
      {
        status: "Y",
        fieldId: 1,
      },
      {
        status: "R",
        fieldId: 1,
      },
    ],
  },
  field: {
    loading: false,
    data: {
      listOfFields: [
        {
          id: 1,
          name: "string",
          address: "string",
        },
      ],
    },
  },
};
describe("testing 1", () => {
  test("render modal create gw", () => {
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Contracts {...initData} />
        </Router>
      </Provider>
    );
    expect(wrapper).toBeTruthy();
  });
});
