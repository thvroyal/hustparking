import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ModalDeleteSlot from "./ModalDeleteSlot";
import thunk from "redux-thunk";

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initData = {
  onClose: () => false,
  open: true,
  id: 1,
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
          <ModalDeleteSlot {...initData} />
        </Router>
      </Provider>
    );
    const modal = wrapper.find("Modal").first().props();
    modal.onHide();
    const btndel = wrapper.find(".btn-info").first();
    btndel.simulate("click");
    const btnupdate = wrapper.find(".btn-danger").first();
    btnupdate.simulate("click");
    expect(wrapper).toBeTruthy();
  });
});
