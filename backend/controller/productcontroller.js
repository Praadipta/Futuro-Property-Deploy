import fs from "fs";
import imagekit from "../config/imagekit.js";
import Property from "../models/propertymodel.js";

// Helper function to parse amenities from various formats
const parseAmenities = (amenities) => {
    if (!amenities) return [];

    // If it's already an array of clean strings, return as-is
    if (Array.isArray(amenities)) {
        // Check if the first element is a JSON string that needs parsing
        if (amenities.length > 0 && typeof amenities[0] === 'string') {
            try {
                // Try to parse if it looks like a JSON array string
                const parsed = JSON.parse(amenities[0]);
                if (Array.isArray(parsed)) {
                    return parsed.flat().filter(item => typeof item === 'string' && item.trim() !== '');
                }
            } catch (e) {
                // Not a JSON string, return the array as-is
                return amenities.filter(item => typeof item === 'string' && item.trim() !== '');
            }
        }
        return amenities.filter(item => typeof item === 'string' && item.trim() !== '');
    }

    // If it's a JSON string, parse it
    if (typeof amenities === 'string') {
        try {
            const parsed = JSON.parse(amenities);
            if (Array.isArray(parsed)) {
                return parsed.flat().filter(item => typeof item === 'string' && item.trim() !== '');
            }
            return [amenities];
        } catch (e) {
            // Not valid JSON, treat as single amenity
            return amenities.trim() ? [amenities.trim()] : [];
        }
    }

    return [];
};

const getFallbackImages = () => {
    const images = [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600596542815-22b8c153bd30?q=80&w=2670&auto=format&fit=crop"
    ];
    // Return 4 random images
    return images.sort(() => 0.5 - Math.random()).slice(0, 4);
};

const addproperty = async (req, res) => {
    try {
        const { title, location, price, beds, baths, sqft, type, availability, description, amenities, phone } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
        let imageUrls = [];

        // Check if ImageKit keys are configured (simple check)
        const isImageKitConfigured = process.env.IMAGEKIT_PUBLIC_KEY &&
            !process.env.IMAGEKIT_PUBLIC_KEY.includes('your_') &&
            process.env.IMAGEKIT_PRIVATE_KEY &&
            !process.env.IMAGEKIT_PRIVATE_KEY.includes('your_');

        if (isImageKitConfigured && images.length > 0) {
            try {
                // Upload images to ImageKit and delete after upload
                imageUrls = await Promise.all(
                    images.map(async (item) => {
                        const result = await imagekit.upload({
                            file: fs.readFileSync(item.path),
                            fileName: item.originalname,
                            folder: "Property",
                        });
                        fs.unlink(item.path, (err) => {
                            if (err) console.log("Error deleting the file: ", err);
                        });
                        return result.url;
                    })
                );
            } catch (uploadError) {
                console.warn("ImageKit upload failed, falling back to mock images:", uploadError.message);
                imageUrls = getFallbackImages();
            }
        } else {
            console.log("ImageKit not configured or no images provided, using fallback images.");
            // CLEANUP: If files were uploaded to temp but we skipped ImageKit, we should delete them
            images.forEach(item => {
                if (fs.existsSync(item.path)) {
                    fs.unlink(item.path, (err) => {
                        if (err) console.log("Error deleting temp file: ", err);
                    });
                }
            });
            imageUrls = getFallbackImages();
        }

        // Create a new product
        const product = new Property({
            title,
            location,
            price,
            beds,
            baths,
            sqft,
            type,
            availability,
            description,
            amenities: parseAmenities(amenities),
            image: imageUrls,
            phone
        });

        // Save the product to the database
        await product.save();

        res.json({ message: "Product added successfully", success: true });
    } catch (error) {
        console.log("Error adding product: ", error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};

const listproperty = async (req, res) => {
    try {
        const property = await Property.find();
        res.json({ property, success: true });
    } catch (error) {
        console.log("Error listing products: ", error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};

const removeproperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.body.id);
        if (!property) {
            return res.status(404).json({ message: "Property not found", success: false });
        }
        return res.json({ message: "Property removed successfully", success: true });
    } catch (error) {
        console.log("Error removing product: ", error);
        return res.status(500).json({ message: "Server Error", success: false });
    }
};

const updateproperty = async (req, res) => {
    try {
        const { id, title, location, price, beds, baths, sqft, type, availability, description, amenities, phone, existingImages } = req.body;

        const property = await Property.findById(id);
        if (!property) {
            console.log("Property not found with ID:", id); // Debugging line
            return res.status(404).json({ message: "Property not found", success: false });
        }

        // Parse existing images from the request
        let parsedExistingImages = [];
        if (existingImages) {
            try {
                parsedExistingImages = JSON.parse(existingImages);
                if (!Array.isArray(parsedExistingImages)) {
                    parsedExistingImages = [];
                }
            } catch (e) {
                console.log("Error parsing existingImages:", e);
                parsedExistingImages = [];
            }
        }

        // Handle new image uploads
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        const newImageFiles = [image1, image2, image3, image4].filter((item) => item !== undefined);
        let newImageUrls = [];

        // Check if ImageKit keys are configured
        const isImageKitConfigured = process.env.IMAGEKIT_PUBLIC_KEY &&
            !process.env.IMAGEKIT_PUBLIC_KEY.includes('your_') &&
            process.env.IMAGEKIT_PRIVATE_KEY &&
            !process.env.IMAGEKIT_PRIVATE_KEY.includes('your_');

        // Upload new images if any
        if (newImageFiles.length > 0) {
            if (isImageKitConfigured) {
                try {
                    newImageUrls = await Promise.all(
                        newImageFiles.map(async (item) => {
                            const result = await imagekit.upload({
                                file: fs.readFileSync(item.path),
                                fileName: item.originalname,
                                folder: "Property",
                            });
                            fs.unlink(item.path, (err) => {
                                if (err) console.log("Error deleting the file: ", err);
                            });
                            return result.url;
                        })
                    );
                } catch (uploadError) {
                    console.warn("ImageKit upload failed:", uploadError.message);
                    // Clean up temp files
                    newImageFiles.forEach(item => {
                        if (fs.existsSync(item.path)) {
                            fs.unlink(item.path, (err) => {
                                if (err) console.log("Error deleting temp file: ", err);
                            });
                        }
                    });
                }
            } else {
                console.log("ImageKit not configured, cleaning up uploaded files.");
                newImageFiles.forEach(item => {
                    if (fs.existsSync(item.path)) {
                        fs.unlink(item.path, (err) => {
                            if (err) console.log("Error deleting temp file: ", err);
                        });
                    }
                });
            }
        }

        // Combine existing images with newly uploaded images
        let finalImageUrls = [...parsedExistingImages, ...newImageUrls];

        // If no images at all, keep the current property images
        if (finalImageUrls.length === 0) {
            finalImageUrls = property.image || [];
        }

        // Update property fields
        property.title = title;
        property.location = location;
        property.price = price;
        property.beds = beds;
        property.baths = baths;
        property.sqft = sqft;
        property.type = type;
        property.availability = availability;
        property.description = description;
        property.amenities = parseAmenities(amenities);
        property.image = finalImageUrls;
        property.phone = phone;

        await property.save();
        res.json({ message: "Property updated successfully", success: true });
    } catch (error) {
        console.log("Error updating product: ", error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};

const singleproperty = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property.findById(id);
        if (!property) {
            return res.status(404).json({ message: "Property not found", success: false });
        }

        // Increment views
        property.views = (property.views || 0) + 1;
        await property.save();

        res.json({ property, success: true });
    } catch (error) {
        console.log("Error fetching property:", error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};

export { addproperty, listproperty, removeproperty, updateproperty, singleproperty };