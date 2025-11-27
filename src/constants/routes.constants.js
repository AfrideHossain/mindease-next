import {
  HomeIcon,
  Info,
  LayoutDashboardIcon,
  Notebook,
  NotebookPen,
} from "lucide-react";

const selectedDate = new Date();
const formattedDate = selectedDate.toISOString().split("T")[0];

export const publicRoutes = [
  {
    sl: 1,
    title: "home",
    path: "/",
    icon: HomeIcon,
  },
  {
    sl: 2,
    title: "about",
    path: "/about",
    icon: Info,
  },
  {
    sl: 3,
    title: "dashboard",
    path: "/dashboard",
    icon: LayoutDashboardIcon,
  },
];

export const privateRoutes = [
  {
    sl: 1,
    title: "my journals",
    path: `/journal?date=${formattedDate}`,
    icon: Notebook,
  },
  {
    sl: 2,
    title: "create new journal",
    path: "/journal/create",
    icon: NotebookPen,
  },
];
