import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail, MessageCircle } from 'lucide-react';
import ContactInfoItem from './InfoItem';

// Custom TikTok icon component since lucide-react doesn't have TikTok
const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const contactInfo = [
  {
    icon: Instagram,
    title: 'Instagram',
    content: '@futuroproperty',
    link: 'https://www.instagram.com/futuroproperty?igsh=NmYycXFrdGp4Yjc=', // Replace with your Instagram link
  },
  {
    icon: TikTokIcon,
    title: 'TikTok',
    content: '@futuroproperty',
    link: '#', // Replace with your TikTok link
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    content: 'Hubungi kami',
    link: 'https://wa.me/+6285124413524', // Replace with your WhatsApp link (e.g., https://wa.me/yourphonenumber)
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'contact@futuroproperty.com',
    link: 'mailto:contact@futuroproperty.com', // Replace with your email
  },
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-2xl shadow-sm"
    >
      <h2 className="text-2xl font-bold mb-8">Hubungi Kami</h2>
      <div className="space-y-6">
        {contactInfo.map((info, index) => (
          <ContactInfoItem key={index} {...info} />
        ))}
      </div>
    </motion.div>
  );
}