import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { Link } from "react-router-dom";

export default function ForgotPassword({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Timer state
  const [timeLeft, setTimeLeft] = useState<number>(600); // 600 seconds = 10 minutes
  const [timerActive, setTimerActive] = useState<boolean>(false);

  // Handle OTP input changes
  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move focus to the next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  // Timer effect
  useEffect(() => {
    let interval: number | undefined;
    
    if (timerActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Redirect to login page when timer expires
      enqueueSnackbar("OTP has expired. Please try again.", { 
        variant: 'error',
      });
      navigate("/user/login");
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timerActive, timeLeft, navigate, enqueueSnackbar]);

  // Format time to MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Send OTP to the user's email
  const sendOtpHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_Backend_URL}/api/auth/forgot-password`, {
        email,
      });
      setOtpSent(true); // Show OTP input fields
      setTimerActive(true); // Start the timer
      
      enqueueSnackbar("OTP sent to your email!", { 
        variant: 'success',
      });
    } catch (error) {
      console.error("OTP send error:", (error as Error).message);
      enqueueSnackbar("Failed to send OTP. Please check your email address.", { 
        variant: 'error',
      });
    }
  };

  // Verify OTP and reset password
  const verifyOtpHandler = async () => {
    const enteredOtp = otp.join("");
    
    if (!newPassword) {
      enqueueSnackbar("Please enter a new password", { 
        variant: 'warning',
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", { 
        variant: 'error',
      });
      return;
    }
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_Backend_URL}/api/auth/reset-password`,
        {
          email,
          otp: enteredOtp,
          newPassword,
        }
      );
      if (response.data.success) {
        enqueueSnackbar("Password reset successfully!", { 
          variant: 'success',
        });
        navigate("/user/login"); // Redirect to login page
      } else {
        console.error("Invalid OTP");
        console.error(response.data.msg);
        enqueueSnackbar(response.data.msg || "Invalid OTP. Please try again.", { 
          variant: 'error',
        });
      }
    } catch (error) {
      console.error("OTP verification error:", (error as Error).message);
      if ((error as any).response) {
        console.error("Response data:", (error as any).response.data);
      }
      enqueueSnackbar("Failed to verify OTP. Please try again.", { 
        variant: 'error',
      });
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6 max-w-md mx-auto", className)}
      {...props}
      onSubmit={sendOtpHandler}
    >
      {/* Form content remains the same */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email to reset your password.
        </p>
      </div>

      {/* Step 1: Enter Email */}
      {!otpSent ? (
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label>Email<sup className="text-[red]">*</sup></Label>
            <Input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Send OTP
          </Button>
        </div>
      ) : (
        // Step 2: Enter OTP and Reset Password
        <div className="grid gap-6">
          {/* Timer Display */}
          <div className="flex items-center justify-center gap-2 py-2">
            <Clock className="text-muted-foreground" size={18} />
            <div className={`text-center font-mono text-lg ${timeLeft < 60 ? 'text-red-500' : 'text-muted-foreground'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* OTP Input */}
          <div className="grid gap-4 py-2">
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

          {/* New Password */}
          <div className="grid gap-2">
            <Label>New Password<sup className="text-red-500">*</sup></Label>
            <Input
              type="password"
              value={newPassword}
              placeholder="Enter new password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="grid gap-2">
            <Label>Confirm Password<sup className="text-red-500">*</sup></Label>
            <Input
              type="password"
              value={confirmPassword}
              placeholder="Confirm new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Verify OTP and Reset Password */}
          <Button type="button" className="w-full" onClick={verifyOtpHandler}>
            Verify OTP & Reset Password
          </Button>
        </div>
      )}

      {/* Back to Login Link */}
      <div className="text-center text-sm">
        Remember your password?{" "}
        <Link to="/user/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}