import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ModalTag from "./ModalTag";
import thunk from "redux-thunk";

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initData = {
  onClose: () => false,
  open: true,
  checkField: true,
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
};
describe("testing 2", () => {
  test("render modal option", () => {
    const store = mockStore(initialState);
    const newData = {
      ...initData,
      checkField: false,
    };
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <ModalTag {...newData} />
        </Router>
      </Provider>
    );
    const btndel = wrapper.find("#userId").first();
    btndel.simulate("change");
    const btntagId = wrapper.find("#tagId").first();
    btntagId.simulate("change");
    const btnupdate = wrapper.find("button").last();
    btnupdate.simulate("click");
    expect(wrapper).toBeTruthy();
  });
});

describe("testing 1", () => {
  test("render modal option", () => {
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <ModalTag {...initData} />
        </Router>
      </Provider>
    );
    const modal = wrapper.find("Modal").first().props();
    modal.onHide();
    const btndel = wrapper.find("#field").first();
    btndel.simulate("change");
    const btnupdate = wrapper.find("button").last();
    btnupdate.simulate("click");
    expect(wrapper).toBeTruthy();
  });
});
