import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ModalDeleteDetector from "./ModalDeleteDetector";
import thunk from "redux-thunk";
import { act } from "@testing-library/react";
Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initData = {
  onClose: () => false,
  open: true,
  id: 1,
  idGW: 1,
};
const initialState = {
  auth: {
    error: "string",
    loading: false,
    info: {
      image: "string",
    },
    alias: 1,
  },
  gateway: {
    data: [
      {
        id: 1,
        address: "string",
      },
      {
        id: 2,
        address: "string",
      },
    ],
  },
};
describe("testing 1", () => {
  test("render modal create gw", () => {
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <ModalDeleteDetector {...initData} />
        </Router>
      </Provider>
    );
    const btn = wrapper.find(".btn-danger").first().props();
    const btnx = wrapper.find(".btn-info").first().props();
    act(() => {
      btn.onClick();
      btnx.onClick();
    });
    expect(wrapper).toBeTruthy();
  });
});
