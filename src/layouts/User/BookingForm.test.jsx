import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import * as redux from "redux";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import BookingForm from "./BookingForm";
import thunk from "redux-thunk";

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock("redux", () => ({
  ...jest.requireActual("redux"),
  useDispatch: jest.fn(),
}));

const initialState = {
  field: {
    data: {
      listOfFields: [
        {
          address: "string",
          area: {
            id: 1,
          },
          details: "string",
          id: 65,
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
    loading: true,
  },
};

const initData = {};

describe("testing 1", () => {
  const useDispatchSpy = jest.spyOn(redux, "useDispatch");
  test("render booking form", () => {
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <BookingForm {...initData} />
        </Router>
      </Provider>
    );
    expect(wrapper).toBeTruthy();
  });
});
