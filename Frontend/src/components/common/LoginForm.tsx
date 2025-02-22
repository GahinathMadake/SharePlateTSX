import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from 'notistack';
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true); // Track password validity
  const [errorMessage, setErrorMessage] = useState<string>(""); // Error message for invalid passwords
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Extract user
  const { user, fetchUserData } = useAuth();

  // Password validation rules
  const validatePassword = (password: string): boolean => {
    const minLength = 8; // Minimum password length
    const hasUppercase = /[A-Z]/.test(password); // Check for at least one uppercase letter

    if (password.length < minLength) {
      setErrorMessage("Password must be at least 8 characters long.");
      return false;
    }
    if (!hasUppercase) {
      setErrorMessage("Password must contain at least one uppercase letter.");
      return false;
    }

    setErrorMessage(""); // Clear error message if password is valid
    return true;
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form refresh

    if (!email || !password) {
      enqueueSnackbar("Please enter both email and password.", { variant: 'warning' });
      return;
    }

    // Validate password before submission
    const isPasswordValid = validatePassword(password);
    setIsPasswordValid(isPasswordValid);

    if (!isPasswordValid) {
      enqueueSnackbar(errorMessage, { variant: 'error' });
      return;
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_Backend_URL + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        console.log("Login Successful:", res.data);
        enqueueSnackbar("Login Successful!", { variant: 'success' });

        await fetchUserData();
      } else {
        console.error("Login failed:", res.data);
        enqueueSnackbar("Login failed. Please try again.", { variant: 'error' });
      }
    } catch (error) {
      console.error("Login Error:", error);
      enqueueSnackbar("Login failed. Please check your credentials.", { variant: 'error' });
    }
  };

  useEffect(() => {
    if (user?.role) {
      navigate(`/user/${user.role}`);
    }
  }, [user]);

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={submitHandler}>
      {/* Form content remains the same */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label>Email<sup className="text-[red]">*</sup></Label>
          <Input
            type="email"
            value={email}
            placeholder="john@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label>
              Password<sup className="text-[red]">*</sup>
            </Label>
            <Link
              to="/user/forgotPassword"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsPasswordValid(validatePassword(e.target.value)); // Validate password on change
              }}
              className="pr-10" // To make space for the icon
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-transform duration-200"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {/* Display error message if password is invalid */}
          {!isPasswordValid && (
            <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            or continue with
          </span>
        </div>

        <Button type="button" variant="outline" className="w-full">
          {/* GitHub icon SVG can be added here */}
          Login with Google
        </Button>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/user/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}