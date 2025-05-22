/* eslint-disable no-unused-vars */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { invoices } from "../Home/AssetTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/Redux/Assets/Action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getAllOrdersForUser } from "@/Redux/Order/Action";
import { calculateProfite } from "@/Util/calculateProfite";
import { readableDate } from "@/Util/readableDate";
import TreadingHistorySkeleton from "@/components/custome/TreadingHistorySkeleton";

const TreadingHistory = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("portfolio");
  const { asset, order } = useSelector((store) => store);
  // const [activeTab, setActiveTab] = useState("portfolio");

  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
    dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }));
  }, []);

  if (asset.loading) {
    return <TreadingHistorySkeleton rows={8} />;
  }
  
  const handleTabChange = (value) => {
    setCurrentTab(value);
  };

  console.log("currentTab-----", currentTab);
  return (
    <div>
      <Table className="px-5  relative text-xs md:text-sm">
        <TableHeader className="py-9">
          <TableRow className="sticky top-0 left-0 right-0 bg-background ">
            <TableHead className="py-3 hidden md:table-cell">Date & Time</TableHead>
            <TableHead>Trading Pair</TableHead>
            <TableHead>Buy Price</TableHead>
            <TableHead>Selling Price</TableHead>
            <TableHead className="hidden md:table-cell">Order Type</TableHead>
            <TableHead className="hidden sm:table-cell">Profit/Loss</TableHead>
            <TableHead className="text-right">VALUE</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="">
          {order.orders?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="hidden md:table-cell">
                <p>{readableDate(item.timestamp).date}</p>
                <p className="text-gray-400">
                  {readableDate(item.timestamp).time}
                </p>
              </TableCell>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage
                    src={item.orderItem.coin.image}
                    alt={item.orderItem.coin.symbol}
                  />
                </Avatar>
                <span> {item.orderItem.coin.name}</span>
              </TableCell>

              <TableCell>${item.orderItem.buyPrice}</TableCell>
              <TableCell>{"$" + item.orderItem.sellPrice || "-"}</TableCell>
              <TableCell className="hidden md:table-cell">{item.orderType}</TableCell>
              <TableCell
                className={`hidden sm:table-cell ${
                  calculateProfite(item) < 0 ? "text-red-600" : ""
                }`}
              >
                {item.orderType == "SELL" ? calculateProfite(item).toFixed(4) : "-"}
              </TableCell>
              <TableCell className="text-right">${item.price}</TableCell>
              {/*  */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TreadingHistory;
