import { getAssetDetails } from "@/Redux/Assets/Action";
import { payOrder } from "@/Redux/Order/Action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { DotIcon } from "@radix-ui/react-icons";
import { DollarSign, DollarSignIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TreadingForm = () => {
  const { coin, asset, wallet } = useSelector((store) => store);
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  const [orderType, setOrderType] = useState("BUY");

  const handleOnChange = (e) => {
    const amount = e.target.value;
    setAmount(amount);
    const volume = calculateBuyCost(amount, coin.coinDetails.market_data.current_price.usd);
    setQuantity(volume);
  };

  function calculateBuyCost(amountUSD, cryptoPrice) {
    let volume = amountUSD / cryptoPrice;

    let decimalPlaces = Math.max(
      2,
      cryptoPrice.toString().split(".")[0].length
    );

    return volume.toFixed(decimalPlaces);
  }

  const handleBuyCrypto = () => {
    dispatch(
      payOrder({
        jwt: localStorage.getItem("jwt"),
        amount,
        orderData: {
          coinId: coin.coinDetails?.id,
          quantity,
          orderType,
        },
      })
    );
  };

  useEffect(()=>{
    dispatch(getAssetDetails({coinId:coin.coinDetails.id,jwt:localStorage.getItem("jwt")}))

  },[])


  return (
    <div className="space-y-10 p-5 px-3 text-xs md:text-sm rounded-lg">
      <div>
        <div className=" flex gap-4 items-center justify-between">
          <Input
            className="py-5 text-xs md:text-sm focus:outline-none focus:border border-black "
            placeholder="Enter the Amount"
            onChange={handleOnChange}
            type="number"
          />
          <div>
            <p className="border text-xs md:text-sm flex justify-center items-center w-28 md:w-36 h-10 overflow-hidden rounded-md">
              {quantity}
            </p>
          </div>
        </div>
        {orderType == "SELL"?
          (asset.assetDetails?.quantity * coin.coinDetails?.current_price <
            amount) && (
            <h1 className="text-red-800 text-xs md:text-sm text-center pt-4">
              Insufficient quantity to sell
            </h1>
          ):(quantity * coin.coinDetails?.market_data.current_price.usd >
            wallet.userWallet?.balance) && (
            <h1 className="text-red-800 text-xs md:text-sm text-center pt-4">
              Insufficient Wallet Balance To Buy
            </h1>
          )}
      </div>

      <div className="flex gap-5 items-center">
        <div>
          <Avatar>
            <AvatarImage src={coin.coinDetails?.image.large} />
          </Avatar>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-xs md:text-sm">{coin.coinDetails?.symbol?.toUpperCase()}</p>
            <DotIcon className="text-gray-400 text-xs md:text-sm" />
            <p className="text-gray-400 text-xs md:text-sm">{coin.coinDetails?.name}</p>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-xl font-bold">
              {coin.coinDetails?.market_data.current_price.usd}
            </p>
            <p
              className={`text-xs md:text-sm ${
                coin.coinDetails?.market_data.price_change_24h < 0
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              <span className="text-xs md:text-sm">
                {coin.coinDetails?.market_data.price_change_24h}
              </span>
              <span className="text-xs md:text-sm">
                ({coin.coinDetails?.market_data.market_cap_change_percentage_24h}%)
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs md:text-sm font-semibold">Order Type</p>
        <p className="text-xs md:text-sm font-semibold">{orderType}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs md:text-sm font-semibold">{orderType == "BUY" ? "Available Cash" : "Available Quantity"}</p>
        <div>
          {orderType == "BUY" ? (
            <div className="flex items-center ">
              <DollarSignIcon size={16}/>
              <span className="text-sm md:text-sm font-semibold">
                {wallet.userWallet?.balance}
              </span>
            </div>
          ) : (
            <p className="text-xs md:text-sm font-semibold">{asset.assetDetails?.quantity || 0}</p>
          )}
        </div>
      </div>
      <div className="">
        <DialogClose className="w-full">
          <Button
          onClick={handleBuyCrypto}
          className={`w-full py-6 ${
            orderType == "SELL" ? "bg-red-600 text-white" : ""
          }`}
          disabled={
            quantity==0 ||
            (orderType == "SELL" && !asset.assetDetails?.quantity) ||
            (orderType == "SELL" ?
              (asset.assetDetails?.quantity * coin.coinDetails?.market_data.current_price.usd <
                amount):quantity * coin.coinDetails?.market_data.current_price.usd >
                wallet.userWallet?.balance)
          }
        >
          {orderType}
        </Button>
        </DialogClose>
        

        <Button
          onClick={() => setOrderType(orderType == "BUY" ? "SELL" : "BUY")}
          className="w-full mt-3 text-sm md:text-base"
          variant="link"
        >
          {orderType == "BUY" ? "Want to Sell?" : "Want to Buy?"}
        </Button>
      </div>
    </div>
  );
};

export default TreadingForm;
