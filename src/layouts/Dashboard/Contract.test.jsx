import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Contract from "./Contract";
import thunk from "redux-thunk";

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initData = {};
const initialState = {
  contract: {
    data: [
      {
        id: 1,
        userId: "string",
        fieldId: 1,
        carNumber: "",
        timeInBook: "",
        timeOutBook: "",
        timeCarIn: "",
        timeCarOut: "",
        status: "Booking",
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
          <Contract {...initData} />
        </Router>
      </Provider>
    );
    const filter = wrapper.find(".text-primary").last();
    filter.simulate("click");
    const showAll = wrapper.find(".text-danger").first();
    showAll.simulate("click");
    const dreop = wrapper.find(".dropdown-item").last();
    dreop.simulate("click");
    expect(wrapper).toBeTruthy();
  });
});
