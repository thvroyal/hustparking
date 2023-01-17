import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ModalCreateGW from "./ModalCreateGW";

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const initData = {
  onClose: () => false,
  open: true,
  id: 1,
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
describe("testing 1", () => {
  test("render modal create gw", () => {
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <ModalCreateGW {...initData} />
        </Router>
      </Provider>
    );
    const form = wrapper.find("Formik").first().props();
    form.onSubmit();
    const close = wrapper.find("Memo(ModalCreateGW)").first().props();
    close.onClose();
    expect(wrapper).toBeTruthy();
  });
});
