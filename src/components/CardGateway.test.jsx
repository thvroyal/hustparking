import CardGateway from "./CardGateway";
import Enzyme, { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

const initData = {
    address: "string",
    id: 1,
    totalDetector: 2,
}

const initialState = {
 
};
const mockStore = configureStore();

test("render card field", () => {
  const store = mockStore(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <CardGateway {...initData}/>
      </Router>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
});
