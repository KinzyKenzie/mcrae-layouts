// Donation code is similar to uksg-layouts: https://github.com/uksgmarathon/uksg-layouts/blob/main/src/extension/tracker.ts

// Could put these in a configuration file.
const baseUrl = 'https://mcrae.myspeed.run/tracker/api/v2';
const eventId = 4;

// https://www.nodecg.dev/docs/extensions
module.exports = function(nodecg) {
    // https://www.nodecg.dev/docs/classes/replicant
    // Declare this replicant at start up to make sure there's always a default if needed.
    const donationTotal = nodecg.Replicant('donationTotal', { default: {} });

    // Function to be triggered when needing to update the donation total value.
    const updateDonationTotalFromApi = async function () {
        const resp = await fetch(`${baseUrl}/events/${eventId}?totals=true&format=json`);
        if (resp.ok) {
            const data = await resp.json();
            if (data) {
                donationTotal.value = data;
            } else {
                nodecg.log.info(`ERROR: ${resp.statusText}`);
            }
        } else {
            nodecg.log.info(`ERROR: ${resp.statusText}`);
        }
    }
    setTimeout(() => { updateDonationTotalFromApi() }, 20 * 1000); // run every 20 seconds
    updateDonationTotalFromApi(); // also run at startup
};
