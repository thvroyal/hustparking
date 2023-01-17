import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import DetectorDebug from "./DetectorDebug";
import thunk from "redux-thunk";

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initData = {};
const initialState = {
  packet: {
    data: [
      {
        nodeAddress: "string",
        time: "23232323232320",
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
          <DetectorDebug {...initData} />
        </Router>
      </Provider>
    );
    const showAll = wrapper.find(".text-danger").first();
    showAll.simulate("click");
    const filtertag = wrapper.find(".text-primary").first();
    filtertag.simulate("click");
    const x = wrapper.find(".dropdown-item").last();
    x.simulate("click");
    expect(wrapper).toBeTruthy();
  });
});
