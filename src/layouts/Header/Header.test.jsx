import Header from "./Header";
import * as Reactx from "react";
import Enzyme, { mount } from "enzyme";
import * as ReactRedux from "react-redux";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { fireEvent } from "@testing-library/react";

Enzyme.configure({ adapter: new Adapter() });

const initialState = { auth: { info: {image: "string"}, role: 2 } };
const mockStore = configureStore();
const dispatch = jest.fn();
jest.spyOn(ReactRedux, "useDispatch").mockReturnValue(dispatch);

test("render app", () => {
  const store = mockStore(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <Header />
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
