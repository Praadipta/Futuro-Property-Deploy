import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle } from 'lucide-react';

const Profile = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
            >
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <UserCircle className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Profil Saya</h2>
                <p className="text-gray-600 mb-8">
                    Halaman profil sedang dalam pengembangan. Segera hadir dengan fitur pengelolaan akun lengkap.
                </p>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-2 bg-blue-600 rounded-full"
                    />
                </div>
                <p className="text-sm text-gray-400">Progress: 70%</p>
            </motion.div>
        </div>
    );
};

export default Profile;
