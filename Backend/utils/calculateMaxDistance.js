 function calculateMaxDistance(expirationDate, currentDate) {
    const timeDifference = (new Date(expirationDate) - currentDate) / (1000 * 60 * 60); // Time difference in hours
    if (timeDifference <= 24) {
      return 5; // Max distance: 5 km (for highly perishable food)
    } else if (timeDifference <= 72) {
      return 10; // Max distance: 10 km (for moderately perishable food)
    } else {
      return 50; // Max distance: 50 km (for less perishable food)
    }
  }

  module.exports={calculateMaxDistance};