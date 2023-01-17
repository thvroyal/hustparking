import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ModalTableMap from "./ModalTableMap";
import thunk from "redux-thunk";

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initData = {
  onClose: () => false,
  open: true,
  listFields: {
    listOfFields: [
      {
        details: "string",
        id: 1,
        totalBook: "string",
        latitude: "string",
        longitude: "string",
        name: "string",
        openstatus: "string",
        busySlot: 0,
        totalSlot: 0,
        price: 1,
      },
    ],
  },
};
const initialState = {
  auth: {
    alias: 1,
  },
  field: {
    data: {
      listOfFields: [
        {
          address: "string",
          area: {
            id: 1,
          },
          details: "string",
          id: 1,
          idArea: 0,
          image: "string",
          latitude: "string",
          longitude: "string",
          name: "string",
          openstatus: "string",
          price: 0,
          space: 0,
        },
        {
          address: "string",
          area: {
            id: 1,
          },
          details: "string",
          id: 2,
          idArea: 0,
          image: "string",
          latitude: "string",
          longitude: "string",
          name: "string",
          openstatus: "string",
          price: 0,
          space: 0,
        },
      ],
    },
  },
  area: {
    data: [{ id: 1, areaName: "string" }],
  },
};

describe("testing 1", () => {
  test("render modal option", () => {
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <ModalTableMap {...initData} />
        </Router>
      </Provider>
    );
    const modal = wrapper.find("Modal").first().props();
    modal.onHide();
    expect(wrapper).toBeTruthy();
  });
});
