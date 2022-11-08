import Sidebar from "./Sidebar";
import Enzyme, { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

const initialState = { auth: { role: 2 } };
const mockStore = configureStore();

test("render app", () => {
  const store = mockStore(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <Sidebar />
      </Router>
    </Provider>
  );
  console.log(wrapper.debug())
    const link = wrapper.find("a").first()
    link.simulate("click")
    const link1 = wrapper.find("a").at(1)
    link1.simulate("click")
    const link2 = wrapper.find("a").at(2)
    link2.simulate("click")
    const link3 = wrapper.find("a").at(3)
    link3.simulate("click")
    const link4 = wrapper.find("a").at(4)
    link4.simulate("click")
    const link5 = wrapper.find("a").at(5)
    link5.simulate("click")
    const link6 = wrapper.find("a").at(6)
    const link7 = wrapper.find("a").at(7)
    const link8 = wrapper.find("a").at(8)
    const link9 = wrapper.find("a").at(9)
    link6.simulate("click")
    link7.simulate("click")
    link8.simulate("click")
    link9.simulate("click")
    const btn = wrapper.find("#sidebarToggle").first()
    btn.simulate("click")
  expect(wrapper).toBeTruthy();
});