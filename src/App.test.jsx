import Enzyme, { mount, shallow } from "enzyme";
import * as ReactRedux from "react-redux";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "./App";
import thunk from "redux-thunk";

Enzyme.configure({ adapter: new Adapter() });

const initialState = { auth: { loading: true } };
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("APP", () => {
  it("render app", () => {
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper).toBeTruthy();
  });
});
