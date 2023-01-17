import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Maps2D from "./2D_maps_C9";
import thunk from "redux-thunk";

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initData = {};
const initialState = {
  slot: {
    data: [
      {
        id: 1,
        carNumber: "string",
      },
    ],
  },
  notify: {
    data: [
      {
        id: 1,
        carNumber: "string",
        statusCam: true,
      },
    ],
  },
};

describe("testing 1", () => {
  test("render modal option", () => {
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Maps2D {...initData} />
        </Router>
      </Provider>
    );
    expect(wrapper).toBeTruthy();
  });
});
