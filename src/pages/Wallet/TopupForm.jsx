import { paymentHandler } from "@/Redux/Wallet/Action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TopupForm = () => {
  const [amount, setAmount] = useState();
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");
  const { wallet } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let value = e.target.value;
    if (value.toString().length < 6) {
      setAmount(e.target.value);
    }
  };

  const handleSubmit = () => {
    dispatch(
      paymentHandler({
        jwt: localStorage.getItem("jwt"),
        paymentMethod,
        amount,
      })
    );
    console.log(amount, paymentMethod);
  };
  return (
    <div className="pt-3 space-y-5">
      <div>
        
        <Input
          onChange={handleChange}
          value={amount}
          className="py-7 text-xs md:text-sm"
          placeholder="Enter Amount"
        />
      </div>

      <div>
        <h1 className="pb-1">Select payment method</h1>
        <RadioGroup
          onValueChange={(value) => {
            setPaymentMethod(value);
          }}
          className="flex"
          defaultValue="RAZORPAY"
        >
          <div className="flex items-center space-x-1 border-black p-1 px-1 rounded-md">
            <RadioGroupItem
              icon={DotFilledIcon}
              iconClassName="h-5 w-5"
              className="h-5 w-5"
              value="RAZORPAY"
              id="r1"
            />
            <Label htmlFor="r1">
              <div className="bg-white rounded-md px-5 py-2 w-24 vs:w-32">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png"
                  alt=""
                  className="w-13 vs:w-15 sm:w-13 md:w-30"
                />
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-1 border-black p-1 px-1 rounded-md">
            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-5 w-5"
              iconClassName="h-5 w-5"
              value="STRIPE"
              id="r2"
            />
            <Label htmlFor="r2">
              <div className="bg-white rounded-md px-5 py-2 w-24 vs:w-28 sm-32">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/768px-Stripe_Logo%2C_revised_2016.svg.png"
                  alt=""
                  className="w-13 vs:w-15 sm:w-13 md:w-30"
                />
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
      {wallet.loading ? (
        <Skeleton className="py-7 w-full" />
      ) : (
        <Button
          onClick={handleSubmit}
          variant=""
          className="w-full py-2 text-xs md:text-sm"
        >
          Submit
        </Button>
      )}
    </div>
  );
};

export default TopupForm;
