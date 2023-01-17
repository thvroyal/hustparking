import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Invoice from "./Invoice";
import thunk from "redux-thunk";

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initData = {};
const initialState = {
  auth: {
    alias: 1,
    role: 2,
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
  field: {
    data: {
      listOfFields: [
        {
          area: { areaName: "string" },
          name: "",
          id: 1,
          totalBook: 1,
          busySlot: 2,
          totalSlot: 4,
        },
      ],
    },
  },
  gateway: {
    data: [
      {
        id: 1,
        fieldId: 1,
        totalDetector: 2,
        address: "",
      },
    ],
  },
  district: {
    data: [
      {
        id: 1,
        district: "string",
      },
    ],
  },
  area: {
    data: [{}],
  },
};

describe("testing 1", () => {
  test("render modal option", () => {
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Invoice {...initData} />
        </Router>
      </Provider>
    );
    expect(wrapper).toBeTruthy();
  });
});
