const Donation = require("../models/Donation"); // Adjust the path to your Donation model

const getYearlyChartData = async () => {
  const yearlyChartData = {};

  // Get donations and group by year and month
  const donations = await Donation.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        totalDonations: { $sum: "$quantity" },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ]);

  // Get redistributions (accepted donations) and group by year and month
  const redistributions = await Donation.aggregate([
    {
      $match: { status: "accepted" }, // Only consider accepted donations
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        totalRedistributed: { $sum: "$quantity" },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ]);

  // Combine donations and redistributions into yearlyChartData
  donations.forEach((donation) => {
    const { year, month } = donation._id;
    const yearKey = year.toString();
    const monthName = new Date(0, month - 1).toLocaleString("default", { month: "short" });

    if (!yearlyChartData[yearKey]) {
      yearlyChartData[yearKey] = [];
    }

    const redistribution = redistributions.find(
      (r) => r._id.year === year && r._id.month === month
    );

    yearlyChartData[yearKey].push({
      name: monthName,
      donations: donation.totalDonations,
      redistributed: redistribution ? redistribution.totalRedistributed : 0,
    });
  });

  return yearlyChartData;
};

module.exports = { getYearlyChartData };