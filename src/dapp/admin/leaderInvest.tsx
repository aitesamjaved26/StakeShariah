import { Button, Label, Modal, TextInput } from "flowbite-react";
import { contractABI, contractAddress, myChainId } from "../../models/contract";
import { getContract } from "viem";
import { useAccount } from "wagmi";
import { prepareWriteContract, writeContract } from "wagmi/actions";
import { useState } from "react";
import React from "react";
import { toast } from 'react-hot-toast';

function LeaderInvest({ onCancel }: { onCancel: any }) {
  const { address } = useAccount();
  const [usrAdd, setUsrAdd] = useState("");
  const [amount, setAmount] = useState("");
  const [ref, setRef] = useState("0x3e153A81611E3Ac7C64991Cdb65652D1e9d11df6");

  async function leaderinvest(useraddr, amount, ref) {
    console.log("hello");
    // if address and referral dont start with '0x' err not valid address
    if (!useraddr.startsWith("0x") || !ref.startsWith("0x")) {
      toast.error("Invalid address");
      return;
    }
    // if amount is not a number err not valid amount
    if (isNaN(amount)) {
      toast.error("Invalid amount");
      return;
    }
    // convert amount to wei
    amount = amount * 10 ** 18;
    const contract = getContract({
      address: contractAddress as any,
      abi: contractABI,
    });
    try {
      const { request } = await prepareWriteContract({
        chainId: myChainId,
        //@ts-ignore
        address: contractAddress,
        //@ts-ignore
        abi: contractABI,
        //@ts-ignore
        //@ts-ignore
        functionName: "leaderinvest",
        //@ts-ignore
        account: address,
        //@ts-ignore
        args: [useraddr, amount, ref],
      });
      console.log(request);
      const { hash } = await writeContract(request);
      onCancel();
    } catch (e) {
      console.log(e);
    }
  }
  const handlePreChange = (e) => {
    setUsrAdd(e.target.value);
  };
  return (
    <div>
      <form
        className="flex flex-col gap-4"
        onSubmit={() => {
          event.preventDefault();
        }}
      >
        <div>
          <div className="mb-2 block">
            <Label value="Enter Address" />
          </div>
          <TextInput
            className="mt-2"
            id="address1"
            type="text"
            placeholder="Enter wallet address"
            required={true}
            onChange={handlePreChange}
          />
                    <div className="mb-2 block">
            <Label value="Enter Amount" />
          </div>
          <TextInput
            className="mt-2"
            id="amount"
            type="text"
            placeholder="Enter investment amount"
            required={true}
            onChange={(e) => setAmount(e.target.value)}
          />
                    <div className="mb-2 block">
            <Label value="Enter Referral" />
          </div>
          <TextInput
            className="mt-2"
            id="ref"
            type="text"
            value={ref}
            placeholder="0x3e153A81611E3Ac7C64991Cdb65652D1e9d11df6"
            required={true}
            onChange={(e) => setRef(e.target.value)}
          />
        </div>
        <div className="flex justify-center gap-4">
          <Button
            color="failure"
            type="submit"
            onClick={() => {
              if ((usrAdd == "" || amount == "")) {
                toast.error("Please fill all the fields");
                return;
              }
              leaderinvest(usrAdd, amount, ref)
            }}
          >
            Yes, I'm sure
          </Button>
          <Button color="gray" onClick={onCancel}>
            No, cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
export default LeaderInvest;
