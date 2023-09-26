import ModalCreateDetector from "./ModalCreateDetector";
import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { act } from "react-dom/test-utils";

Enzyme.configure({ adapter: new Adapter() });

const initData = {
    onClose: jest.fn(),
    open: true,
    checkField: true,
    idGW: 2,
    addrDetector: "100.1.1.1",
    idField: 65
}

const initialState = {
  auth: {
    error: "string",
    loading: false,
    info: {
        image: "string",
    }
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
          id: 65,
          idArea: 0,
          image: "string",
          latitude: "string",
          longitude: "string",
          name: "string",
          openstatus: "string",
          price: 0,
          space: 0
        }
      ]
    }
  },
  area: {
    data: []
  }
};
const mockStore = configureStore();

test("render card field", async () => {
  const store = mockStore(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <ModalCreateDetector {...initData}/>
      </Router>
    </Provider>
  );
  const formik = wrapper.find("form").first();
  act(() => {
    formik.simulate("submit");
   })
  expect(wrapper).toBeTruthy();
});

test("render card field", async () => {
    const newData = {
        ...initData,
        checkField: false,
    }
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <ModalCreateDetector {...newData}/>
        </Router>
      </Provider>
    );
    console.log(wrapper.debug());
    const formik = wrapper.find("form").first();
    act(() => {
     formik.simulate("submit");
    })
    const btn = wrapper.find("button").first();
    btn.simulate("click");
    expect(wrapper).toBeTruthy();
  });
