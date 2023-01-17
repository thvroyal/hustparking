import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ModalCreateSlot from "./ModalCreateSlot";
import thunk from "redux-thunk";

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initData = {
  onClose: () => false,
  open: true,
  fieldName: "string",
  fieldId: 1,
};
const initialState = {
  auth: {
    alias: 1,
  },
};

describe("testing 1", () => {
  test("render modal option", () => {
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <ModalCreateSlot {...initData} />
        </Router>
      </Provider>
    );
    const modal = wrapper.find("Modal").first().props();
    modal.onHide();
    const btndel = wrapper.find("#id").first();
    btndel.simulate("change");
    const btnupdate = wrapper.find("button").last();
    btnupdate.simulate("click");
    expect(wrapper).toBeTruthy();
  });
});
