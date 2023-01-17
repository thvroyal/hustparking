import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Tags from "./Tags";
import thunk from "redux-thunk";

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initData = {};
const initialState = {
  auth: {
    alias: 1,
  },
  listTag: {
    data: [
      {
        tagId: 1,
        user: {
          id: 1,
          email: "",
        },
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
          <Tags {...initData} />
        </Router>
      </Provider>
    );
    const tag = wrapper.find("Memo(ModalTag)").first().props();
    tag.onClose();
    const tagDel = wrapper.find("Memo(ModalDelete)").first().props();
    tagDel.onClose();
    const btnregi = wrapper.find(".btn-outline-primary").first();
    btnregi.simulate("click");
    const btnupd = wrapper.find(".btn-outline-info").first();
    btnupd.simulate("click");
    const btndel = wrapper.find(".btn-outline-danger").first();
    btndel.simulate("click");
    expect(wrapper).toBeTruthy();
  });
});
