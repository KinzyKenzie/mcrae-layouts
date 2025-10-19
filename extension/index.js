module.exports = function(nodecg) {
    const donationData = nodecg.Replicant('donationData', { default: {} });
    const config = nodecg.bundleConfig.tracker ?? { enabled: false };

    const fetchDonationTotals = async function () {
        if(!config.enabled) { return; }

        const resp = await fetch(`${config.baseUrl}/events/${config.eventId}?totals=true&format=json`);
        let success = false;

        if (resp.ok) {
            const data = await resp.json();
            if (data) {
                donationData.value = data;
                success = true;
            } else {
                nodecg.log.info(`[Tracker] ERROR: ${resp.statusText}`);
            }
        } else {
            nodecg.log.info(`[Tracker] ERROR: ${resp.statusText}`);
        }
        return success;
    }
    
    if (fetchDonationTotals()) {
        nodecg.log.info(`[Tracker] Successfully connected to API endpoint`);
    }
    setInterval(() => { fetchDonationTotals() }, 58 * 1000);
};
