import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AnimatedInput from "@/Animations/FormDiv";

// Auth context
import { useAuth } from "@/context/AuthContext";

interface UserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "Donar" | "NGO";
  registrationNumber?: string;
}

export default function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {

  const {user, fetchUserData} = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Donar",
  });


  const handleChange = (index: number, value: string) => {
    // if (isNaN(Number(value))) return; 
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); 
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };


  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendOtpHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_Backend_URL}/api/auth/send-otp`, userData);

      console.log(res.data);
      setOtpSent(true); // Hide form and show OTP input
    }
    catch (error) {
      console.error("OTP send error:", (error as Error).message);
    }
  };


  const verifyOtpHandler = async () => {
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_Backend_URL}/api/auth/verify-otp`,
        { userData, otp }
      );
      console.log(response);
      console.log("Response Headers:", response.headers);
      const token = response.headers["authorization"].split(" ")[1];
      localStorage.setItem("token", token);

      fetchUserData();
      navigate("/user/admin");
    } catch (error) {
      console.error("OTP verification error:", (error as Error).message);
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={sendOtpHandler}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign Up to your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to create an account.
        </p>
      </div>

      {/* Show OTP Input if OTP is Sent */}
      {
      otpSent ? 
      (
        <div className="grid gap-4 py-2">
      <div className="py-4 grid gap-5">
        <Label>Enter OTP<sup className="text-[red]">*</sup></Label>
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <Input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
              className="w-12 h-12 text-center text-lg"
            />
          ))}
        </div>
      </div>
      <Button type="button" className="w-full" onClick={verifyOtpHandler}>
        Verify OTP & Register
      </Button>
    </div>
      ) 
      : 
      (
        <div className="grid gap-6">
          {/* Role Selector */}
          <div className="mx-auto flex gap-2 p-1 bg-[#111111] rounded-full max-w-max">
            <Button
              type="button"
              className={`rounded-full px-3 py-1 hover:bg-[#333] transition-all duration-100 ${
                userData.role === "Donar" ? "bg-[#444]" : "bg-transparent"
              }`}
              onClick={() =>
                setUserData((prev) => ({
                  ...prev,
                  role: "Donar",
                  registrationNumber: undefined,
                }))
              }
            >
              Donar
            </Button>
            <Button
              type="button"
              className={`rounded-full px-3 py-1 hover:bg-[#333] transition-all duration-100 ${
                userData.role === "NGO" ? "bg-[#444]" : "bg-transparent"
              }`}
              onClick={() =>
                setUserData((prev) => ({
                  ...prev,
                  role: "NGO",
                  registrationNumber: "",
                }))
              }
            >
              NGO
            </Button>
          </div>

          {/* Name */}
          <div className="grid gap-2">
            <Label>Name<sup className="text-[red]">*</sup></Label>
            <Input
              type="text"
              name="name"
              value={userData.name}
              placeholder="John Doe"
              onChange={changeHandler}
              required
            />
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label>Email<sup className="text-[red]">*</sup></Label>
            <Input
              type="email"
              name="email"
              value={userData.email}
              placeholder="John@gmail.com"
              onChange={changeHandler}
              required
            />
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label>Password<sup className="text-red-500">*</sup></Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={userData.password}
                onChange={changeHandler}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-transform duration-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="grid gap-2">
            <Label>Confirm Password<sup className="text-red-500">*</sup></Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={changeHandler}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-transform duration-200"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Registration Number (Only for NGO) */}
          <AnimatedInput isVisible={userData.role === "NGO"}>
            <Label>Registration Number<sup className="text-[red]">*</sup></Label>
            <Input
              type="text"
              name="registrationNumber"
              value={userData.registrationNumber || ""}
              onChange={changeHandler}
              required
            />
          </AnimatedInput>

          {/* Send OTP Button */}
          <Button type="submit" className="w-full">
            Send OTP
          </Button>
        </div>
      )}

      {/* Login Link */}
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/user/login" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>
  );
}
