    const User = require("../models/User");


    const getPendingNgos = async (req, res) => {
        try {
        console.log("getPendingNgos");
        const ngos = await User.find({ role: "ngo", isVerified: false });
        console.log(ngos);
        res.status(200).json(ngos);
        } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        }
    };


    const approveNgo = async (req, res) => {
        try {
        const { id } = req.params;
        const ngo = await User.findByIdAndUpdate(id, { isVerified: true }, { new: true });
    
        if (!ngo) {
            return res.status(404).json({ error: "NGO not found" });
        }
    
        const status = ngo.isVerified ? "Approved" : "Pending";

        res.status(200).json({ message: "NGO approved successfully", ngo ,status});
        } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        }
    };


    const rejectNgo = async (req, res) => {
        try {
        const { id } = req.params;
        const { rejectionReason } = req.body;
    
        const ngo = await User.findByIdAndUpdate(
            id,
            { isVerified: false, rejectionReason },
            { new: true }
        );
    
        if (!ngo) {
            return res.status(404).json({ error: "NGO not found" });
        }
    
        res.status(200).json({ message: "NGO rejected successfully", ngo });
        } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        }
    };



    const getNgoById = async (req, res) => {
        try {
        const { id } = req.params;
        const ngo = await User.findById(id);
    
        if (!ngo) {
            return res.status(404).json({ error: "NGO not found" });
        }
    
        res.status(200).json(ngo);
        } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        }
    };


    module.exports = {
        getPendingNgos,
        approveNgo,
        rejectNgo,
        getNgoById,
    };




