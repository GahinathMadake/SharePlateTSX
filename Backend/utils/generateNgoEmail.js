function generateNGOEmail(donorDetails, donationDetails) {
  const subject = "🌍 New Donation Match - SharePlate 🌱";

  const text = `Hello,

A new donation is available for your NGO.

Donor Details:
- Name: ${donorDetails.name}
- Email: ${donorDetails.email}

Donation Details:
- Food Type: ${donationDetails.foodType}
- Quantity: ${donationDetails.quantity} Servings
- Expiration Date: ${new Date(donationDetails.expirationDate).toLocaleDateString()}
- Pickup Location: ${donationDetails.pickupLocation}

Please contact the donor to arrange pickup.

Thank you for helping us reduce food waste and support our community.

Best regards,
SharePlate Team`;

  const html = `<div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #4CAF50;">🌍 New Donation Match - SharePlate 🌱</h2>
          <p>Hello,</p>
          <p>A new donation is available for your NGO.</p>
          <h3 style="color: #4CAF50;">Donor Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${donorDetails.name}</li>
            <li><strong>Email:</strong> ${donorDetails.email}</li>
          </ul>
          <h3 style="color: #4CAF50;">Donation Details:</h3>
          <ul>
            <li><strong>Food Type:</strong> ${donationDetails.foodType}</li>
            <li><strong>Quantity:</strong> ${donationDetails.quantity} kg</li>
            <li><strong>Expiration Date:</strong> ${new Date(donationDetails.expirationDate).toLocaleDateString()}</li>
            <li><strong>Pickup Location:</strong> ${donationDetails.pickupLocation}</li>
          </ul>
          <p>Please contact the donor to arrange pickup.</p>
          <p>Thank you for helping us reduce food waste and support our community.</p>
          <p style="color: #4CAF50;">Best regards,<br>SharePlate Team</p>
          <footer style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #ddd;">
            <p style="font-size: 12px; color: #777;">You are receiving this email because you are a registered NGO with SharePlate.</p>
          </footer>
          </div>`;

  return { subject, text, html };
}

module.exports = { generateNGOEmail };