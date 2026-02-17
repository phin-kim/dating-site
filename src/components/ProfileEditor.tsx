import React, { useState, useRef } from 'react';
import type { UserProfile } from '../types/profile';
import { PRIMARY_GRADIENT } from '../library/constants';
import { FaPlus, FaCamera } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
interface ProfileEditorProps {
    user: UserProfile;
    onSave: (updatedUser: UserProfile) => void;
    onCancel: () => void;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({
    user,
    onSave,
    onCancel,
}) => {
    const [formData, setFormData] = useState<UserProfile>({ ...user });
    const [newInterest, setNewInterest] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'age' ? parseInt(value) || 0 : value,
        }));
    };

    const addInterest = (e: React.FormEvent) => {
        e.preventDefault();
        if (
            newInterest.trim() &&
            !formData.interests.includes(newInterest.trim())
        ) {
            setFormData((prev) => ({
                ...prev,
                interests: [...prev.interests, newInterest.trim()],
            }));
            setNewInterest('');
        }
    };

    const removeInterest = (interest: string) => {
        setFormData((prev) => ({
            ...prev,
            interests: prev.interests.filter((i) => i !== interest),
        }));
    };

    const handleFileSelection = (file: File) => {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setFormData((prev) => ({ ...prev, images: [result] }));
        };
        reader.readAsDataURL(file);
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelection(e.target.files[0]);
        }
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelection(e.dataTransfer.files[0]);
        }
    };

    const triggerFilePicker = () => {
        fileInputRef.current?.click();
    };
    return (
        <div className="w-full space-y-8 duration-500 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-4">
                <label className="block text-sm font-bold tracking-widest text-gray-500 uppercase">
                    Profile Photo URL
                </label>
                <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={triggerFilePicker}
                    className={`group relative flex h-64 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border-2 border-dashed transition-all ${isDragging ? 'scale-[1.01] border-rose-500 bg-rose-50' : 'border-gray-200 bg-gray-50 hover:border-rose-300 hover:bg-white'} `}
                >
                    {formData.images[0] ? (
                        <>
                            <img
                                src={formData.images[0]}
                                alt="Profile Preview"
                                className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 opacity-80 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center transition-all bg-black/20 group-hover:bg-black/40">
                                <div className="flex items-center justify-center w-16 h-16 mb-2 text-2xl text-white transition-opacity transform translate-y-2 rounded-full opacity-0 bg-white/20 backdrop-blur-md group-hover:translate-y-0 group-hover:opacity-100">
                                    <FaCamera />
                                </div>
                                <p className="font-bold text-white transition-opacity transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                    Change Photo
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="p-6 text-center">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-2xl text-gray-400 transition-all bg-white border border-gray-100 shadow-sm rounded-2xl group-hover:scale-110 group-hover:text-rose-400">
                                <i
                                    className={`fas ${isDragging ? 'fa-arrow-down' : 'fa-cloud-upload-alt'}`}
                                ></i>
                            </div>
                            <p className="mb-1 font-bold text-gray-700">
                                {isDragging
                                    ? 'Drop it here!'
                                    : 'Click or drag photo'}
                            </p>
                            <p className="text-sm text-gray-400">
                                SVG, PNG, JPG (max. 5MB)
                            </p>
                        </div>
                    )}

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={onFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="px-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        Fallback URL
                    </label>
                    <input
                        type="text"
                        name="images"
                        value={
                            formData.images[0].startsWith('data:')
                                ? 'Local file uploaded'
                                : formData.images[0]
                        }
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                images: [e.target.value],
                            }))
                        }
                        className="px-4 py-3 text-sm transition-all border border-gray-100 outline-none rounded-xl bg-gray-50 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-rose-500"
                        placeholder="Or paste an image link..."
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="block text-sm font-bold tracking-widest text-gray-500 uppercase">
                        Display Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 transition-all border border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-rose-500"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-bold tracking-widest text-gray-500 uppercase">
                        Age
                    </label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full px-4 py-3 transition-all border border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-rose-500"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-bold tracking-widest text-gray-500 uppercase">
                    Occupation
                </label>
                <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-all border border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-rose-500"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-bold tracking-widest text-gray-500 uppercase">
                    Bio
                </label>
                <textarea
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-all border border-gray-200 outline-none resize-none rounded-xl focus:ring-2 focus:ring-rose-500"
                    placeholder="Tell your story..."
                />
            </div>

            <div className="space-y-4">
                <label className="block text-sm font-bold tracking-widest text-gray-500 uppercase">
                    Interests
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                    {formData.interests.map((interest) => (
                        <span
                            key={interest}
                            className="group flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-600"
                        >
                            {interest}
                            <button
                                onClick={() => removeInterest(interest)}
                                className="hover:text-rose-800"
                            >
                                <FaTimes className="text-[10px]" />
                            </button>
                        </span>
                    ))}
                </div>
                <form onSubmit={addInterest} className="flex gap-2">
                    <input
                        type="text"
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-rose-500"
                        placeholder="Add an interest..."
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 text-gray-600 transition-all bg-gray-100 rounded-xl hover:bg-gray-200"
                    >
                        <FaPlus />
                    </button>
                </form>
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    onClick={onCancel}
                    className="flex-1 py-4 font-bold text-gray-600 transition-all bg-gray-100 rounded-2xl hover:bg-gray-200"
                >
                    Cancel
                </button>
                <button
                    onClick={() => onSave(formData)}
                    className={`flex-2 rounded-2xl py-4 ${PRIMARY_GRADIENT} font-bold text-white shadow-lg shadow-rose-200 transition-all hover:shadow-xl`}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default ProfileEditor;
