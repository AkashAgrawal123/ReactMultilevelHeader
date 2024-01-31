import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { usersList } from "../Data/mockData";
import { SidebarMenuData } from "../Data/SidebarMenuData";

const mock = new MockAdapter(axios);

mock.onGet("/users").reply(200, {
  users: usersList,
});

mock.onGet("/nav-data").reply(200, {
  navData: SidebarMenuData,
});

export default axios;
