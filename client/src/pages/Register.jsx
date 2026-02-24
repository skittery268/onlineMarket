import { useForm } from "../hooks/useForm";
import { useAuth } from "../context/Auth.context";
import { Link } from "react-router";

const Register = () => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        name: "",
        email: "",
        password: ""
    })

    const { register } = useAuth();

    const registerUser = (e) => {
        handleSubmit(e, register);
        resetForm();
    }

    return (
        <section className="flex justify-center items-center h-[90vh]">
            <form onSubmit={(e) => registerUser(e)} className="w-90 h-120 bg-[white] border rounded-[10px] relative border-[#cfcfcf]">
                <h1 className="absolute left-6 top-4 text-2xl">Registration</h1>
                <img src="./icons/user.png" className="h-6 absolute top-25 left-5" />
                <input type="text" name="name" value={formData.name} placeholder="Enter your name" onChange={handleChange} className="absolute top-25 left-5 border-b focus:border-b-black border-b-gray-300 pl-8 w-80 pb-2 outline-none" />
                <img src="./icons/email.png" className="h-6 absolute top-40 left-5" />
                <input type="email" name="email" value={formData.email} placeholder="Enter Email" onChange={handleChange} className="absolute top-40 left-5 border-b focus:border-b-black border-b-gray-300 pl-8 w-80 pb-2 outline-none" />
                <img src="./icons/padlock.png" className="h-6 absolute top-55 left-5" />
                <input type="password" name="password" value={formData.password} placeholder="Create a password" onChange={handleChange} className="absolute top-55 left-5 border-b focus:border-b-black border-b-gray-300 pl-8 w-80 pb-2 outline-none" />
                <input type="checkbox" name="remember" id="remember" className="absolute size-4 top-66.5 left-5 cursor-pointer" required />
                <label htmlFor="remember" className="absolute top-65.5 left-12 cursor-pointer text-[15px]">I accept all terms & conditions</label>
                <button type="submit" className="absolute top-85 bg-[#4A99F8] w-80 left-5 h-13 text-white rounded-[5px] cursor-pointer hover:bg-[#2688ff]">Register Now</button>
                <p className="absolute top-101 text-[13px] left-19">Already have an account? <Link to={"/login"} className="text-blue-500">Login now</Link></p>
            </form>
        </section>
    )
}

export default Register;