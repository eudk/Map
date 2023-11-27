const app = Vue.createApp({
    data() {
        return {
            map: null,
            buttonText: 'Zoom In', // skal bruge ellers skifter den ikke navn
        };
    },


    methods: {
        initializeMap() {
            this.map = L.map('map').setView([56.2639, 9.5018], 7); // start position bare kort over dk
            const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);
        
            //  markering af observationer
            const tempMarker = L.marker([56.2639, 9.5018]).addTo(this.map);
            tempMarker.bindPopup('Observation').openPopup();

            const tempMarker2 = L.marker([56.6649, 9.6418]).addTo(this.map);
            tempMarker2.bindPopup('Observation').openPopup();
        },

        // Knap til at zoome ind og ud metode (:
        zoomCurrentLocation() {
            if (this.buttonText === 'Zoom In') {
                this.buttonText = 'Tilbage';
                this.map.setView([56.2639, 9.5018], 13);
            } else {
                this.buttonText = 'Zoom In';
                this.map.setView([56.2639, 9.5018], 7);
            }
        },
    },
    mounted() {
        this.initializeMap();
    },
});

app.mount('#app');
