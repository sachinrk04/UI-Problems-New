/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { toast } from "sonner";

const OtpInput = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const otpRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: any, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const getOtp = [...otp];
    getOtp[index] = value;
    setOtp(getOtp);

    if (value && index < 5) {
      otpRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (key: string, index: number) => {
    if (key === "Backspace") {
      if (otp[index]) {
        const getOtp = [...otp];
        getOtp[index] = "";
        setOtp(getOtp);
      } else if (index > 0) {
        otpRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text");
    // const removeText = pastedData.replace(/\D/g, "");

    if (!/^\d+$/.test(pastedData)) {
      toast.error("Invalid OTP!");
      return;
    } else if (pastedData.length !== 6) {
      toast.warning("Invalid OTP length!");
    }

    // if (!pastedData) return;

    const newOtp = Array(6).fill("");

    for (let i = 0; i < 6; i++) {
      if (pastedData[i] !== undefined) {
        newOtp[i] = pastedData[i];
      }
    }

    setOtp(newOtp);

    // Focus the next input if available
    const focusIndex = Math.min(pastedData.length, 5);
    otpRef.current[focusIndex]?.focus();
  };

  const handleReset = () => {
    setOtp(Array(6).fill(""));
    otpRef.current[0]?.focus();
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");
    console.log(otpValue);
  };

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <div className="space-y-2 bg-gray-100 p-4 rounded-md">
          <Label>Enter OTP</Label>
          <div className="flex gap-x-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(element) => {
                  otpRef.current[index] = element;
                }}
                type="text"
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e.key, index)}
                onPaste={(e) => handlePaste(e)}
                className="w-9 h-9 rounded-sm"
              />
            ))}
          </div>
          <div className="flex justify-end gap-x-2">
            <Button
              variant={"secondary"}
              className="h-9 rounded-sm"
              onClick={() => handleReset()}
            >
              Reset
            </Button>
            <Button
              className="h-9 rounded-sm"
              onClick={() => handleSubmit()}
              disabled={otp.join("").length !== 6}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
