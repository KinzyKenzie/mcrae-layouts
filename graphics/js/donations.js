const donationTotal = nodecg.Replicant('donationTotal', { default: {} });
const readout =  document.getElementById('donation-total');

donationTotal.on('change', (newVal, oldVal) => {
    readout.innerHTML = new Intl.NumberFormat("en-GB", { style: "currency", currency: newVal.paypalcurrency })
        .format( newVal.amount );
});
