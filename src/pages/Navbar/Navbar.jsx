import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AvatarIcon,
  Cross1Icon,
  DragHandleHorizontalIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import SideBar from "../SideBar/SideBar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const handleNavigate=()=>{
    if(auth.user){
      auth.user.role==="ROLE_ADMIN"?navigate("/admin/withdrawal"):navigate("/profile")
    }
  }
  return (
    <>
      <div className="px-2 py-3 border-b z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-0 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Sheet className="">
            <SheetTrigger>
              <Button
                className="rounded-full h-11 w-11"
                variant="ghost"
                size="icon"
              >
                <DragHandleHorizontalIcon className=" h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent
              className="w-72  border-r-0 flexs flex-col  justify-center"
              side="left"
            >
              <SheetHeader>
                <SheetTitle>
                  <div className="text-xl font-normal flex gap-3 items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://cdn.pixabay.com/photo/2021/04/30/16/47/binance-logo-6219389_1280.png" />
                    </Avatar>
                    <div>
                      <span>Abi </span>
                      <span>Trade</span>
                    </div>
                    <SheetClose className="ml-14">
                      <Cross1Icon/>
                    </SheetClose>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <SideBar />
            </SheetContent>
          </Sheet>

          <p
            onClick={() => navigate("/")}
            className="text-sm lg:text-base cursor-pointer"
          >
            Abi Trade
          </p>
          <div className="p-0 ml-9">
            <Button
              variant="outline"
              onClick={() => navigate("/search")}
              className="flex items-center gap-7 p-5 px-3 pl-5"
            >
              {" "}
              <span>Search</span>
              <MagnifyingGlassIcon className="left-1 top-3" />
            </Button>
          </div>
        </div>
        <div>
          <Avatar className="cursor-pointer" onClick={handleNavigate}>
            {!auth.user ? (
              <AvatarIcon className=" h-8 w-8" />
            ) : (
              <AvatarFallback>{auth.user?.fullName[0].toUpperCase()}</AvatarFallback>
            )}
          </Avatar>
        </div>
      </div>
    </>
  );
};

export default Navbar;
