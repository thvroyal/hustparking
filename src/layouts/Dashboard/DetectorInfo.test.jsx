import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import DetectorInfo from "./DetectorInfo";
import thunk from "redux-thunk";

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initData = {};
const initialState = {
  detectorById: {
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
          <DetectorInfo {...initData} />
        </Router>
      </Provider>
    );
    expect(wrapper).toBeTruthy();
  });
});
