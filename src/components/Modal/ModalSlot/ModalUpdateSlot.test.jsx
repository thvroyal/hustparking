import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ModalUpdateSlot from "./ModalUpdateSlot";
import thunk from "redux-thunk";

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initData = {
  onClose: () => false,
  open: true,
  id: 1,
  fieldId: 1,
  fieldName: "string",
  cam: true,
  detector: false,
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
          <ModalUpdateSlot {...initData} />
        </Router>
      </Provider>
    );
    const modal = wrapper.find("Modal").first().props();
    modal.onHide();
    const btnupdate = wrapper.find("button").last();
    btnupdate.simulate("click");
    const toggle = wrapper.find("SwitchToggle").first().props();
    toggle.onChecked();
    toggle.onUnchecked();
    const togglex = wrapper.find("SwitchToggle").last().props();
    togglex.onChecked();
    togglex.onUnchecked();
    expect(wrapper).toBeTruthy();
  });
});
