import { useState } from "react";
import { useAuth } from "../context/Auth.context";
import { useForm } from "../hooks/useForm";

const Profile = () => {
    const { user, editInfo } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        image: "",
        id: user._id,
        name: "",
        email: ""
    });

    const saveChanges = (e) => {
        handleSubmit(e, editInfo);
        setIsEditing(false);
        resetForm();
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 bg-linear-to-r from-blue-400 to-indigo-500 text-white text-center">
                <img src={!user.image ? './icons/user2.png' : user.image} className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white" />
                <h2 className="mt-4 text-2xl font-semibold">{user.name}</h2>
                <p className="text-sm opacity-90">{user.email}</p>
                {
                    !isEditing && (
                        <button className="mt-4 px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 cursor-pointer" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    )
                }
            </div>
            {
                isEditing && (
                    <form className="p-6 space-y-4 bg-gray-50" onSubmit={(e) => saveChanges(e)}>
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded outline-none focus:ring" placeholder={user.name} />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded outline-none focus:ring" placeholder={user.email} />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Profile Image URL</label>
                            <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full px-3 py-2 border rounded outline-none focus:ring" placeholder="Image URL..." />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button type="button" className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer" onClick={() => setIsEditing(false)}>Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">Save</button>
                        </div>
                    </form>
                )
            }
        </div>
    );
}

export default Profile;