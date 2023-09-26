import CardField from "./CardField";
import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

const initData = {
    area: "string",
    name: "string",
    id: 1,
    data: [],
    GW: [],
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

test("render card field", () => {
  const store = mockStore(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <CardField {...initData}/>
      </Router>
    </Provider>
  );
  console.log(wrapper.debug());
  const event = {ctrlKey: true};
  const div1 = wrapper.find(".text-gray-800").first();
  div1.simulate("keydown", event);
  div1.simulate("click");

  const tooltip = wrapper.find("#tooltipCreateGW").first();
  tooltip.simulate("keydown", event);
  tooltip.simulate("click");
  expect(wrapper).toBeTruthy();
});
