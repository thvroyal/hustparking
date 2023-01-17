import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Detectors from "./Detectors";
import thunk from "redux-thunk";

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initData = {};
const initialState = {
  auth: {
    alias: 1,
  },
  detector: {
    data: [
      {
        id: 1,
        addressDetector: "",
        gatewayId: 1,
        slotId: 1,
        batteryLevel: "",
        communication_level: "",
        lastTimeUpdate: "",
        lastTimeSetup: "",
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
          <Detectors {...initData} />
        </Router>
      </Provider>
    );
    console.log(wrapper.debug());
    const btnCreate = wrapper.find(".btn-outline-primary").first();
    btnCreate.simulate("click");
    const btnCreatex = wrapper.find(".btn-outline-info").first();
    btnCreatex.simulate("click");
    const btnCreatey = wrapper.find(".btn-outline-danger").first();
    btnCreatey.simulate("click");
    const modalCreate = wrapper
      .find("Memo(ModalCreateDetector)")
      .first()
      .props();
    modalCreate.onClose();
    const modalDel = wrapper.find("Memo(ModalDeleteDetector)").first().props();
    modalDel.onClose();
    expect(wrapper).toBeTruthy();
  });
});
