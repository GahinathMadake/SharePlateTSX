function generateNGOEmail(donorDetails, donationDetails) {
    const subject = "New Donation Match - SharePlate";
  
    const text = `Hello,
  
  A new donation is available for your NGO.
  
  Donor Details:
  - Name: ${donorDetails.name}
  - Email: ${donorDetails.email}
  
  Donation Details:
  - Food Type: ${donationDetails.foodType}
  - Quantity: ${donationDetails.quantity} kg
  - Expiration Date: ${new Date(donationDetails.expirationDate).toLocaleDateString()}
  - Pickup Location: ${donationDetails.pickupLocation}
  
  Please contact the donor to arrange pickup.
  
  Thank you,
  SharePlate Team`;
  
    const html = `<p>Hello,</p>
                  <p>A new donation is available for your NGO.</p>
                  <p><strong>Donor Details:</strong></p>
                  <ul>
                    <li><strong>Name:</strong> ${donorDetails.name}</li>
                    <li><strong>Email:</strong> ${donorDetails.email}</li>
                  </ul>
                  <p><strong>Donation Details:</strong></p>
                  <ul>
                    <li><strong>Food Type:</strong> ${donationDetails.foodType}</li>
                    <li><strong>Quantity:</strong> ${donationDetails.quantity} kg</li>
                    <li><strong>Expiration Date:</strong> ${new Date(donationDetails.expirationDate).toLocaleDateString()}</li>
                    <li><strong>Pickup Location:</strong> ${donationDetails.pickupLocation}</li>
                  </ul>
                  <p>Please contact the donor to arrange pickup.</p>
                  <p>Thank you,<br>SharePlate Team</p>`;
  
    return { subject, text, html };
}

module.exports={generateNGOEmail};