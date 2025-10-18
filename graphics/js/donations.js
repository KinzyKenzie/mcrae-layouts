const donationData = nodecg.Replicant('donationData', { default: {} });
const readout =  document.getElementById('donation-total');

donationData.on('change', (newVal, oldVal) => {
    readout.innerHTML = new Intl.NumberFormat("en-GB", { style: "currency", currency: newVal.paypalcurrency })
        .format( newVal.amount );
});
