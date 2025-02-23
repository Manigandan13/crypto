import { transferMoney } from "@/Redux/Wallet/Action";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDispatch } from "react-redux";

const TransferForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    amount: "",
    walletId: "",
    purpose: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // setAmount(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(
      transferMoney({
        jwt: localStorage.getItem("jwt"),
        walletId: formData.walletId,
        reqData: {
          amount: formData.amount,
          purpose: formData.purpose,
        },
      })
    );
    console.log(formData);
  };
  return (
    <div className="pt-10 space-y-5 text-xs md:text-sm">
      <div>
        <Input
          name="amount"
          onChange={handleChange}
          value={formData.amount}
          className="py-7"
          placeholder="Enter Amount"
        />
      </div>
      <div>
        <Input
          name="walletId"
          onChange={handleChange}
          value={formData.walletId}
          className="py-7"
          placeholder="Enter Wallet Id"
        />
      </div>

      <div>
        <Input
          name="purpose"
          onChange={handleChange}
          value={formData.purpose}
          className="py-7"
          placeholder="Enter your Message"
        />
      </div>

      <DialogClose>
        <Button
          onClick={handleSubmit}
          variant=""
          className="w-full py-5 px-6"
        >
          Send
        </Button>
      </DialogClose>
    </div>
  );
};

export default TransferForm;
