# SharePlate

<div align="center">

🌍 **A Food Waste Reduction Platform** 🍽️

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen)](https://lnkd.in/df9KJedV)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue)](https://lnkd.in/dnYHgEvG)

</div>

## 📋 Overview

SharePlate is a platform dedicated to reducing food waste by connecting NGOs with surplus food for efficient food sharing. This initiative ensures that excess food reaches those in need while promoting sustainability.

## ✨ Key Features

- **Secure Account Creation**: Email verification ensures only authentic users can create accounts, enhancing platform security.
- **User Activity & Platform Management**: Optimized user interactions and platform functionalities for a seamless experience.
- **Robust Security Measures**: End-to-end security implementation, from user verification to preventing unauthorized access.
- **NGO Verification System**: Only verified NGOs can proceed, preventing misuse and maintaining credibility.
- **Real-Time Notifications**: Instant alerts to surrounding NGOs when donations are uploaded for quick response and efficient redistribution.
- **Carbon Footprint Calculation**: Tracks and measures carbon footprints, promoting sustainable food practices.
- **Google Maps Integration & Real-Time Route Display**: Facilitates smooth logistics by displaying real-time routes and calculating the distance between donors and NGOs for efficient coordination.
- **AI Matching System**: Uses AI to match food donations with NGOs based on travel time and food expiration dates, ensuring that perishable food reaches the nearest NGOs before it goes to waste.
- **Fraud Prevention & Transparency**: Strict verification protocols eliminate fraudulent activities by NGOs, ensuring fair and transparent food distribution.
- **Statistical Dashboards**: Comprehensive dashboards for Admin, Donor, and NGO with key metrics and insights.
- **Feedback Module**: Allows NGOs to share reviews and upload geotagged images of donation activities.

## 🛠️ Tech Stack

### Frontend
- TypeScript
- Shadcn UI

### Backend
- Node.js + Express.js

### Database
- MongoDB Atlas Cluster

### Storage & APIs
- Image Storage: Cloudflare R2 (S3 Bucket)
- Google Maps API for route optimization and distance calculations

## 🔍 Detailed Features

### Administrative Controls
- **NGO Authentication**: Verification of NGO authenticity by admin
- **Statistical Dashboards**: Comprehensive analytics for all platform users

### Smart Matching System
- **AI-Powered Algorithm**: Matches donors with NGOs based on:
  - Travel time between locations
  - Food expiration dates
  - NGO capacity and needs

### Real-Time Functionality
- **Route Optimization**: Display of optimal routes between donors and NGOs
- **Instant Notifications**: Alerts closest NGOs immediately after donation posting

### Verification & Transparency
- **Proof of Distribution**: Geotagged images uploaded by NGOs
- **Review System**: Feedback from NGOs about donation processes

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Account
- Google Maps API Key

### Installation
```bash
# Clone the repository
git clone https://lnkd.in/dnYHgEvG
cd shareplate

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your environment variables

# Start the development server
npm run dev
```

## 👨‍💻 Team

Thanks to our amazing team:
- Shripad Khandare
- Gahinath Madake
- Rohan Wagh
- Shreyash Padase

## 🤝 Contributing

We welcome contributions! Please see our [contributing guidelines](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Support

If you find this project useful, please give it a star on GitHub and share it with others!

#FoodWasteReduction #SharePlate #TechForGood #Sustainability #AIForGood
