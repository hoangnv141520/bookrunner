import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/auth';
import { checkLogin } from '../Auth/utils/login.util';

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userProfile, setUserProfile] = useState<User>();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        dateOfBirth: '',
        desc: '',
        image: ''
    });
    const server = import.meta.env.VITE_SERVER

    useEffect(() => {

        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const data = await checkLogin();
            if (!data) {
                navigate('/login');
                return;
            }
            setUserProfile(data.user);
            setFormData({
                image: data.user.image,
                username: data.user.username,
                email: data.user.email,
                dateOfBirth: data.user.dateOfBirth,
                desc: data.user.desc
            })
            setPreviewImage(data.user.image);
        } catch (error) {
            showToast('Failed to fetch profile data', 'error');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch(`${server}/api/users/${userProfile?.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            })
            navigate('/profile')
        } catch (error) {
            showToast('Failed to update profile', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            const target = e.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const file = target.files[0];
                setPreviewImage(URL.createObjectURL(file));

                try {
                    const uploadForm = new FormData();
                    uploadForm.append('file', file);

                    const res = await fetch(`${server}/api/upload`, {
                        method: 'POST',
                        body: uploadForm
                    });

                    const result = await res.json();
                    console.log(result);

                    if (res.ok && result.url) {
                        console.log('Upload successful, new image URL:', result.url);
                        setFormData({
                            ...formData,
                            image: result.url
                        });
                        console.log('Updated formData:', formData);
                    } else {
                        console.error('Upload failed:', result);
                    }
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
        } else if (name === 'name') {
            setFormData({
                ...formData,
                username: value
            });
        } else if (name === 'email') {
            setFormData({
                ...formData,
                email: value
            });
        } else if (name === 'dateOfBirth') {
            setFormData({
                ...formData,
                dateOfBirth: value
            });
        } else if (name === 'desc') {
            setFormData({
                ...formData,
                desc: value
            });
        }
    };
    const showToast = (message: string, type: 'success' | 'error') => {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-4 right-4 p-4 rounded-md text-white ${type === 'success' ? 'bg-green-600' : 'bg-red-600'
            } shadow-lg transition-opacity duration-300 z-50`;
        toast.innerText = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-zinc-900 text-gray-200 p-6">
            <div className="max-w-lg mx-auto bg-zinc-800 rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                    <h1 className="text-2xl font-bold text-white mb-6 text-center">Edit Profile</h1>

                    <form onSubmit={handleSubmit}>
                        {/* Avatar Upload */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-zinc-700 mb-4 relative">
                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <svg className="w-full h-full text-zinc-500 p-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                )}
                            </div>

                            <label className="flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md cursor-pointer transition-colors duration-200">
                                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                </svg>
                                Change Avatar
                                <input
                                    type="file"
                                    name="image"
                                    className="sr-only"
                                    onChange={handleChange}
                                    accept="image/*"
                                />
                            </label>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                />
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-300 mb-1">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="desc" className="block text-sm font-medium text-gray-300 mb-1">
                                    About Me
                                </label>
                                <textarea
                                    id="desc"
                                    name="desc"
                                    rows={4}
                                    value={formData.desc}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-colors"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors duration-200 flex items-center justify-center"
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;