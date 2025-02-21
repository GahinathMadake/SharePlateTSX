    const User = require("../models/User");
    const sendEmail = require("../utils/sendEmail");


    const getPendingNgos = async (req, res) => {
        try {
        const ngos = await User.find({ role: "NGO", isVerified: false });
        //count pending ngos
        const PendingNgosCount = ngos.length;
        res.status(200).json({ngos,PendingNgosCount});
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


    const getTotalNgos = async (req, res) => {

        try {
            //total ngo count
           const totalNgos= await User.countDocuments({ role: "NGO" });
           
           res.status(200).json({ totalNgos });
         } catch (error) {
           console.error("Error fetching total Ngos:", error);
           res.status(500).json({ message: "Server error" });
         }


    }


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




    const rejectNgo = async (req, res) => {
        try {
            const { id } = req.params;
            const { rejectionReason } = req.body;  // Get reason from frontend
            console.log(rejectionReason);
            const ngo = await User.findById(id);
            if (!ngo) {
                return res.status(404).json({ error: "NGO not found" });
            }
    
            // Store rejection reason before deleting
            const rejectionData = {
                name: ngo.name,
                email: ngo.email,
                rejectionReason,
            };
    
            // Delete the NGO
            await User.findByIdAndDelete(id);

        // const subject = "Your NGO Application has been Rejected";
        // const text = `Dear ${ngo.name},\n\nWe regret to inform you that your NGO application has been rejected. Reason: ${rejectionReason}\n\nBest regards,\nThe Team`;
        // const html = `<p>Dear ${ngo.name},</p><p>We regret to inform you that your NGO application has been rejected. <strong>Reason:</strong> ${rejectionReason}</p><p>Best regards,<br/>The Team</p>`;
        
        const subject = "Your NGO Application has been Rejected";
const text = `
    Dear ${ngo.name},
    
    We regret to inform you that your NGO application has been rejected.
    
    Reason: ${rejectionReason}
    
    Best regards,
    The Team
`;

const html = `
    <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f9; padding: 20px;">
            <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <tr>
                    <td style="text-align: center; padding-bottom: 20px;">
                        <img src="https://example.com/logo.png" alt="NGO Logo" style="width: 150px;"/>
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 18px; color: #333333; text-align: center; padding-bottom: 20px;">
                        <strong>Dear ${ngo.name},</strong>
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 16px; color: #555555; line-height: 1.6;">
                        <p>We regret to inform you that your NGO application has been rejected. The reason for the rejection is as follows:</p>
                        <p style="font-size: 18px; font-weight: bold; color: #ff4c4c;">"${rejectionReason}"</p>
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 16px; color: #555555; line-height: 1.6; padding-top: 20px;">
                        <p>If you have any questions or would like to discuss further, please feel free to contact us.</p>
                        <p>Best regards,</p>
                        <p><strong>The NGO Review Team</strong></p>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center; padding-top: 20px;">
                        <a href="https://example.com" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Visit Our Website</a>
                    </td>
                </tr>
            </table>
        </body>
    </html>
`;


        await sendEmail(ngo.email, subject, text, html);
            // Send response with rejection details (use this for email)
            res.status(200).json({ message: "NGO deleted successfully", rejectionData });
    
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }

    };





   



    module.exports = {
        getPendingNgos,
        approveNgo,
        rejectNgo,
        getNgoById,
        getTotalNgos
    };




