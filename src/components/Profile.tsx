import { useState } from 'react';
import Navbar from './Navbar';
import ProfileEditor from './ProfileEditor';
import type { UserProfile } from '../types/profile';
const INITIAL_USER: UserProfile = {
    id: 'me',
    name: 'Alex',
    age: 27,
    bio: 'Always searching for the best espresso in the city. Love hiking, indie movies, and exploring new horizons. ☕️🎬🏔️',
    location: 'San Francisco, CA',
    occupation: 'Product Designer',
    images: [
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
    ],
    interests: ['Coffee', 'Hiking', 'Photography', 'Movies', 'Pizza'],
};
const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER);
    const handleSaveProfile = (updatedUser: UserProfile) => {
        setCurrentUser(updatedUser);
        setIsEditing(false);
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center px-4 pt-24">
                <div className="w-full max-w-xl overflow-hidden rounded-[3rem] border border-gray-100 bg-white shadow-2xl">
                    <div className="relative h-48 bg-linear-to-r from-rose-400 to-orange-300">
                        <div className="absolute -bottom-12 left-8">
                            <img
                                src={currentUser.images[0]}
                                alt="Profile"
                                className="object-cover w-32 h-32 border-4 border-white shadow-xl rounded-3xl"
                            />
                        </div>
                    </div>
                    <div className="px-8 pt-16 pb-12">
                        {!isEditing ? (
                            <>
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h1 className="text-3xl font-bold">
                                            {currentUser.name},{' '}
                                            {currentUser.age}
                                        </h1>
                                        <p className="text-gray-500">
                                            {currentUser.occupation} •{' '}
                                            {currentUser.location}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-6 py-2 font-bold border rounded-xl border-rose-100 bg-rose-50 text-rose-500"
                                    >
                                        Edit Profile
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-400 uppercase">
                                            About Me
                                        </h3>
                                        <p className="leading-relaxed text-gray-700">
                                            {currentUser.bio}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="mb-3 text-sm font-bold tracking-widest text-gray-400 uppercase">
                                            Interests
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {currentUser.interests.map(
                                                (tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl"
                                                    >
                                                        {tag}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-6 border rounded-2xl border-rose-100 bg-rose-50">
                                        <div className="flex items-center gap-2 mb-2">
                                            <i className="fas fa-crown text-rose-400"></i>
                                            <h3 className="font-bold text-rose-600">
                                                Love Connect Premium
                                            </h3>
                                        </div>
                                        <p className="mb-4 text-sm text-rose-500/80">
                                            Enjoy unlimited likes and exclusive
                                            priority in discovery!
                                        </p>
                                        <button className="w-full py-3 font-bold bg-white shadow-sm rounded-xl text-rose-500">
                                            Manage Subscription
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <ProfileEditor
                                user={currentUser}
                                onSave={handleSaveProfile}
                                onCancel={() => setIsEditing(false)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Profile;
