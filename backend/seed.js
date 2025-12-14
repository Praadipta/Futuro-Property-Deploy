import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Property from './models/propertymodel.js';

dotenv.config({ path: '.env.local' });

const properties = [
    {
        title: "Luxury Modern Villa",
        location: "Beverly Hills, CA",
        price: 4500000,
        image: [
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2670&auto=format&fit=crop"
        ],
        beds: 5,
        baths: 6,
        sqft: 4500,
        type: "House",
        availability: "For Sale",
        description: "Experience the epitome of luxury living in this stunning modern villa. Featuring panoramic views, an infinity pool, and state-of-the-art smart home technology.",
        amenities: ["Pool", "Gym", "Smart Home", "Wine Cellar", "Home Theater"],
        phone: "+1 310-555-0123"
    },
    {
        title: "Urban Loft Apartment",
        location: "New York, NY",
        price: 1200000,
        image: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2680&auto=format&fit=crop"
        ],
        beds: 2,
        baths: 2,
        sqft: 1500,
        type: "Apartment",
        availability: "For Rent",
        description: "Chic industrial-style loft in the heart of the city. High ceilings, exposed brick walls, and huge windows flooding the space with natural light.",
        amenities: ["Concierge", "Rooftop Deck", "Gym", "Parking"],
        phone: "+1 212-555-0199"
    },
    {
        title: "Cozy Seaside Cottage",
        location: "Cape Cod, MA",
        price: 850000,
        image: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=2680&auto=format&fit=crop"
        ],
        beds: 3,
        baths: 2,
        sqft: 1800,
        type: "Cottage",
        availability: "For Sale",
        description: "Charming cottage just steps from the beach. Perfect for a summer getaway or year-round living. Features a wrap-around porch and fireplace.",
        amenities: ["Beach Access", "Fireplace", "Garden", "Patio"],
        phone: "+1 508-555-0144"
    },
    {
        title: "Modern Minimalist Home",
        location: "Austin, TX",
        price: 950000,
        image: [
            "https://images.unsplash.com/photo-1600596542815-22b8c153bd30?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
        ],
        beds: 4,
        baths: 3,
        sqft: 2800,
        type: "House",
        availability: "For Sale",
        description: "Sleek and sustainable design in a thriving neighborhood. Open floor plan, energy-efficient appliances, and a beautiful drought-tolerant garden.",
        amenities: ["Solar Panels", "EV Charging", "Home Office", "Outdoor Kitchen"],
        phone: "+1 512-555-0177"
    }
];

const seed = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || "mongodb://admin:password@localhost:27017/buildestate?authSource=admin";
        console.log(`Connecting to MongoDB...`);

        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('✅ Connected to DB');

        await Property.deleteMany({});
        console.log('Cleared existing properties');

        await Property.insertMany(properties);
        console.log(`✅ Seeded ${properties.length} properties successfully`);

        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
};

seed();
