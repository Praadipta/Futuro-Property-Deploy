import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';

const Notifications = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
            >
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Bell className="w-10 h-10 text-yellow-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Notifikasi</h2>
                <p className="text-gray-600 mb-8">
                    Belum ada notifikasi baru untuk saat ini. Kami akan memberi tahu Anda jika ada pembaruan penting.
                </p>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "30%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-2 bg-yellow-600 rounded-full"
                    />
                </div>
                <p className="text-sm text-gray-400">System Ready</p>
            </motion.div>
        </div>
    );
};

export default Notifications;
