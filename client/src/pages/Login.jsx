import { Link } from "react-router";
import { useAuth } from "../context/Auth.context";
import { useForm } from "../hooks/useForm";

const Login = () => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        email: "",
        password: "",
        remember: "off"
    })

    const { login } = useAuth();

    const loginUser = (e) => {
        handleSubmit(e, login);
        resetForm();
    }

    return (
        <section className="flex justify-center items-center h-[90vh]">
            <form onSubmit={(e) => loginUser(e)} className="w-90 h-100 bg-[white] border rounded-[10px] relative border-[#cfcfcf]">
                <h1 className="absolute left-6 top-4 text-2xl">Login</h1>
                <img src="./icons/email.png" className="h-6 absolute top-25 left-5" />
                <input type="email" name="email" value={formData.email} placeholder="Enter your email" onChange={handleChange} className="absolute top-25 left-5 border-b focus:border-b-black border-b-gray-300 pl-8 w-80 pb-2 outline-none" />
                <img src="./icons/padlock.png" className="h-6 absolute top-40 left-5" />
                <input type="password" name="password" value={formData.password} placeholder="Confirm a password" onChange={handleChange} className="absolute top-40 left-5 border-b focus:border-b-black border-b-gray-300 pl-8 w-80 pb-2 outline-none" />
                <input type="checkbox" name="remember" value={formData.remember} onChange={(e) => handleChange({ target: { name: "remember", value: e.target.checked ? "on" : "off" } })} id="remember" className="absolute size-4 top-54 left-5 cursor-pointer" />
                <label htmlFor="remember" className="absolute top-53 left-12 cursor-pointer text-[15px]">Remember me</label>
                <button type="submit" className="absolute top-70 bg-[#4A99F8] w-80 left-5 h-13 text-white rounded-[5px] cursor-pointer hover:bg-[#2688ff]">Login Now</button>
                <p className="absolute top-88 text-[13px] left-19">Don't have an account? <Link to={"/register"} className="text-blue-500">Signup now</Link></p>
            </form>
        </section>
    )
}

export default Login;