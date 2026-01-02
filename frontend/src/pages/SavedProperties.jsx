import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const SavedProperties = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
            >
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Properti Tersimpan</h2>
                <p className="text-gray-600 mb-8">
                    Belum ada properti yang disimpan. Jelajahi properti kami dan simpan yang Anda sukai!
                </p>
                <Link
                    to="/properties"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                    Jelajahi Properti
                </Link>
            </motion.div>
        </div>
    );
};

export default SavedProperties;
