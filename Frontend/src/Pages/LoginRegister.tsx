import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area"
import loginImage from '../assets/form/login.jpg';
import signupImage from '../assets/form/signup.jpg';
import logo from '../assets/logo.png';



export default function LoginRegister() {
    const location = useLocation();
    const isSignUp = location.pathname === "/user/login";

    return (
            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="relative hidden bg-muted lg:block">
                    <img
                        src={isSignUp?signupImage:loginImage}
                        alt="SharePlate Image"
                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.9] dark:grayscale"
                    />
                    <img src={logo} className="absolute left-10 top-10 h-12 w-auto" />
                </div>
                
                <ScrollArea className="w-full h-screen">
                    <div className="flex flex-col gap-4 p-4 md:p-10">
                        <div className="flex justify-center gap-2 md:justify-start">
                            <a href="#" className="flex items-center gap-2 font-medium">
                                <img src={logo} className="w-[200px]" />
                            </a>
                        </div>
                        
                        <div className="flex flex-1 items-center justify-center">
                            <div className="w-[400px] border rounded-sm shadow-md px-6 py-4">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </ ScrollArea>
            </div>
    )
}
