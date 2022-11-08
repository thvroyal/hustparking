import HeaderMain from "./HeaderMain";
import Enzyme, { mount } from "enzyme";
import * as ReactRedux from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { fireEvent } from "@testing-library/react";

Enzyme.configure({ adapter: new Adapter() });

const initialState = { auth: { info: {image: "string"} } };
const mockStore = configureStore();
const dispatch = jest.fn();
jest.spyOn(ReactRedux, "useDispatch").mockReturnValue(dispatch);
test("render app", () => {
  const store = mockStore(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <HeaderMain />
      </Router>
    </Provider>
  );

  const event = {
    target: 1,
  };
  fireEvent.mouseDown(document, event);
  const handleShow = wrapper.find("#dropdownUser1").first();
  handleShow.simulate("click");
  const logOut = wrapper.find("#testID").first();
  logOut.simulate("click");
  expect(wrapper).toBeTruthy();
});
