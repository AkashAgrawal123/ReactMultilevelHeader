import { rest } from "msw";
import { SidebarMenuData } from "../Data/SidebarMenuData";

export const handlers = [
  rest.get("/nav-data", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(SidebarMenuData));
  }),
];
