import { logout } from "@/Redux/Auth/Action";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import {
  ExitIcon,
  HandIcon,
  BookmarkFilledIcon,
  BookmarkIcon,
  PersonIcon,
  DashboardIcon,
  HomeIcon,
  BellIcon,
  ActivityLogIcon,
} from "@radix-ui/react-icons";
import { CreditCardIcon, LandmarkIcon, SettingsIcon, WalletIcon } from "lucide-react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
const menu = [
  { name: "Home", path: "/", icon: <HomeIcon className="h-4 w-4" /> },
  {
    name: "Portfolio",
    path: "/portfolio",
    icon: <DashboardIcon className="h-4 w-4" />,
  },

  {
    name: "Watchlist",
    path: "/watchlist",
    icon: <BookmarkIcon className="h-4 w-4" />,
  },
  {
    name: "Activity",
    path: "/activity",
    icon: <ActivityLogIcon className="h-4 w-4" />,
  },
  { name: "Wallet", path: "/wallet", icon: <WalletIcon className="h-4 w-4" /> },

  {
    name: "Withdrawal",
    path: "/withdrawal",
    icon: <CreditCardIcon className="h-4 w-4" />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <PersonIcon className="h-4 w-4" />,
  },
  
  { name: "Logout", path: "/", icon: <ExitIcon className="h-4 w-4" /> },
];
const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMenuClick = (item) => {
    if (item.name == "Logout") {
      handleLogout();
      navigate(item.path);
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="mt-10 space-y-5">
      {menu.map((item) => (
        <div key={item} className="">
          <SheetClose className="w-full">
            <div
              onClick={() => handleMenuClick(item)}
              className="flex items-center gap-5 py-1 w-full"
            >
              <span className="w-4 hover:text-slate-400">{item.icon}</span>
              <p className="text-xs md:text-sm hover:text-slate-400">{item.name}</p>
            </div>
          </SheetClose>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
