import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
            >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <SettingsIcon className="w-10 h-10 text-gray-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Pengaturan</h2>
                <p className="text-gray-600 mb-8">
                    Halaman pengaturan akun sedang dalam pengembangan. Anda akan segera dapat mengubah preferensi akun Anda di sini.
                </p>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "45%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-2 bg-gray-600 rounded-full"
                    />
                </div>
                <p className="text-sm text-gray-400">Progress: 45%</p>
            </motion.div>
        </div>
    );
};

export default Settings;
