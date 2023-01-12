
import { LoginElement, RegisterElement } from "./includes/elements";



const LoginRegister = () : JSX.Element => {
    return (
        <div className="w-full h-full flex items-center justify-center fixed">
           <LoginElement/>
           <RegisterElement/>
        </div>
    );
}
  
export default LoginRegister;