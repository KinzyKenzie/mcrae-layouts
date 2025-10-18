// Donation code is similar to uksg-layouts: https://github.com/uksgmarathon/uksg-layouts/blob/main/src/extension/tracker.ts

// Could put these in a configuration file.
const baseUrl = 'https://mcrae.myspeed.run/tracker/api/v2';
const eventId = 4;

module.exports = function(nodecg) {
    // Declare this replicant at start up to make sure there's always a default if needed.
    const donationData = nodecg.Replicant('donationData', { default: {} });

    // Function to be triggered when needing to update the donation total value.
    const updateDonationTotalFromApi = async function () {
        const resp = await fetch(`${baseUrl}/events/${eventId}?totals=true&format=json`);
        if (resp.ok) {
            const data = await resp.json();
            if (data) {
                donationData.value = data;
            } else {
                nodecg.log.info(`ERROR: ${resp.statusText}`);
            }
        } else {
            nodecg.log.info(`ERROR: ${resp.statusText}`);
        }
    }
    
    updateDonationTotalFromApi(); // run at startup
    setInterval(() => { updateDonationTotalFromApi() }, 58 * 1000); // also run every minute
};
