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
import TreadingHistory from "./TreadingHistory";
import { useNavigate } from "react-router-dom";
import PortfolioSkeleton from "@/components/custome/PortfolioSkeleton";

const tab = ["portfolio", "history"];
const Portfolio = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("portfolio");
  const { asset } = useSelector((store) => store);
  // const [activeTab, setActiveTab] = useState("portfolio");

  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
  }, []);

  const handleTabChange = (value) => {
    setCurrentTab(value);
  };

  console.log("currentTab-----", currentTab);
  return (
    <div className="px-5 md:px-10 py-5 mt-10">
      <div className="pb-5 flex items-center gap-5">
        <Select
          onValueChange={handleTabChange}
          defaultValue="portfolio"
          className=""
        >
          <SelectTrigger className="w-[180px] py-[1.2rem] ">
            <SelectValue placeholder="Select Portfolio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="portfolio">Portfolio</SelectItem>
            <SelectItem value="history">History</SelectItem>
          </SelectContent>
        </Select>

        {/* {tab.map((item) => (
          <Button
          key={item}
            className="rounded-full"
            size="lg"
            onClick={() => setActiveTab(item)}
            variant={activeTab == item ? "secondary" : "outline"}
          >
            {item.toUpperCase()}
          </Button>
        ))} */}
      </div>
      {
        currentTab == "portfolio" ? (
          asset.loading ? (
        <PortfolioSkeleton rows={6} />
      ) :
         ( <Table className="px-5  relative text-xs md:text-sm">
            <TableHeader className="py-9">
              <TableRow className="sticky top-0 left-0 right-0 bg-background ">
                <TableHead className="py-3">Assets</TableHead>
                <TableHead className="hidden md:table-cell">PRICE</TableHead>
                <TableHead>UNIT</TableHead>
                <TableHead className="hidden md:table-cell">CHANGE</TableHead>
                <TableHead>CHANGE(%)</TableHead>
                <TableHead>VALUE</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="cursor-pointer">
              {asset.userAssets?.map((item) => (
                <TableRow
                  onClick={() => navigate(`/market/${item.coin.id}`)}
                  key={item.id}
                >
                  <TableCell className="font-medium flex items-center gap-2">
                    <Avatar className="-z-50">
                      <AvatarImage
                        src={item.coin.image}
                        alt={item.coin.symbol}
                      />
                    </Avatar>
                    <span> {item.coin.name}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{item.coin.current_price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell
                    className={` hidden md:table-cell ${
                      item.coin.price_change_percentage_24h < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.coin.price_change_24h.toFixed(4)}
                  </TableCell>
                  <TableCell
                    className={`${
                      item.coin.price_change_percentage_24h < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.coin.price_change_percentage_24h.toFixed(3)}%
                  </TableCell>

                  <TableCell>
                    {(item.coin.current_price * item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )) : (
          <TreadingHistory />
        )
        // <div className="flex items-center justify-center h-[70vh]">
        //   <h1 className="text-3xl font-semibold">No History Available</h1>
        //   </div>
      }
    </div>
  );
};

export default Portfolio;
