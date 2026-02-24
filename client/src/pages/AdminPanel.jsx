import { useAdmin } from "../context/AdminContext";

const AdminPanel = () => {
    const { users, deleteUser, changeRole } = useAdmin();

    return (
        <>
            <h1 className="text-[30px] mt-17 ml-30">Admin Panel</h1>
            <table className="border ml-30 mt-5 border-gray-300">
                <thead>
                    <tr className="border">
                        <th className="border border-gray-300 pr-15 pl-15 pt-2 pb-2">ID</th>
                        <th className="border border-gray-300 pr-15 pl-15 pt-2 pb-2">Profile Image</th>
                        <th className="border border-gray-300 pr-15 pl-15 pt-2 pb-2">Name</th>
                        <th className="border border-gray-300 pr-15 pl-15 pt-2 pb-2">Email</th>
                        <th className="border border-gray-300 pr-15 pl-15 pt-2 pb-2">Role</th>
                        <th className="border border-gray-300 pr-15 pl-15 pt-2 pb-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user._id}>
                                <td className="border border-gray-300 px-4 py-2">{user._id}</td>
                                <td className="border-b border-b-gray-300 flex justify-center items-center"><img src={user.image ? user.image : "/icons/user.png"} className="hover:shadow duration-300 h-10 w-10 border border-gray-300 m-3 rounded-full" /></td>
                                <td className="border border-gray-300 pl-5 pr-5 text-center text-gray-400">{user.name}</td>
                                <td className="border border-gray-300 pl-5 pr-5 text-center text-gray-400">{user.email}</td>
                                <td className="border border-gray-300 ml-5 mr-5 text-center"><button onClick={() => changeRole(user._id, user.role === "admin" ? "user" : "admin")} className={`cursor-pointer ${user.role === "admin" ? "text-red-500" : "text-blue-500"}`}>{user.role}</button></td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button onClick={() => deleteUser(user._id)} className="bg-red-500 cursor-pointer hover:bg-red-600 p-2 text-white rounded">Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default AdminPanel;