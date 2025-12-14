import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, CheckCircle } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Kepercayaan',
    description: 'Kami memverifikasi semua pemilik dan penyewa properti untuk memastikan pengalaman yang aman dan dapat diandalkan bagi semua orang.',
  },
  {
    icon: CheckCircle,
    title: 'Transparansi',
    description: 'Listing properti yang jelas dan jujur dengan informasi akurat tanpa biaya tersembunyi.',
  },
  {
    icon: Clock,
    title: 'Efisiensi',
    description: 'Proses pencarian dan listing properti yang efisien untuk menghemat waktu dan tenaga Anda.',
  },
];

export default function Values() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Nilai-Nilai Kami</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Nilai-nilai inti ini memandu semua yang kami lakukan di Futuro Property
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 transform transition-transform duration-300 hover:rotate-6">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}