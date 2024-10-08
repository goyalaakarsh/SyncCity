import Resource from "../models/resource.model.js";

export const addResource = async (req, res) => {
    try {
        const { name, quantity } = req.body;

        if (!name || !quantity) {
            return res.status(400).json({ message: "Name and quantity are required" });
        }

        let resource = await Resource.findOne({ name });

        if (resource) {
            // Resource exists, update quantity
            resource.quantity += quantity;
            await resource.save();
            res.status(200).json({ message: "Resource updated successfully", resource });
        } else {
            // Resource doesn't exist, create new
            resource = new Resource({ name, quantity });
            await resource.save();
            res.status(201).json({ message: "Resource created successfully", resource });
        }
    } catch (error) {
        console.error('Error in addResource:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        res.status(200).json(resources);
    } catch (error) {
        console.error('Error in getAllResources:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const reduceResource = async (req, res) => {
    try {
        const { name, quantity } = req.body;

        if (!name || !quantity || isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({ message: "Valid name and positive quantity are required" });
        }

        const resource = await Resource.findOne({ name });

        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }

        const newQuantity = Math.max(0, resource.quantity - quantity);
        const quantityReduced = resource.quantity - newQuantity;

        resource.quantity = newQuantity;
        await resource.save();

        res.status(200).json({ 
            message: "Resource quantity updated successfully", 
            resource,
            quantityReduced,
            actualReduction: quantityReduced !== quantity ? 
                `Note: Only ${quantityReduced} units were reduced to prevent negative quantity.` : 
                undefined
        });
    } catch (error) {
        console.error('Error in reduceResource:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getSpecificResources = async (req, res) => {
    try {
        console.log("Received resources from frontend:", req.body.resources);  // Debugging log

        const { resources } = req.body;
        const resourceNames = resources.map(r => r.name);
        
        const foundResources = await Resource.find({ name: { $in: resourceNames } });

        console.log("Found resources in DB:", foundResources);  // Debugging log

        const result = foundResources.map(resource => {
            const requestedResource = resources.find(r => r.name === resource.name);
            console.log(`Matching resource: ${resource.name}, requested quantity: ${requestedResource ? requestedResource.quantity : 'not found'}`);  // Debugging log
            
            return {
                ...resource.toObject(),
                requestedQuantity: requestedResource ? requestedResource.quantity : 0
            };
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching specific resources', error: error.message });
    }
};
