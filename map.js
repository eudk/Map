                    
const map = L.map('map').setView([56.2639, 9.5018], 7);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
L.marker([56.2639, 9.5018]).addTo(map); // add marker in the map

Vue.createApp({
    data() {
        
    },
    methods: {
        zoomCurrentLocation() {
            map.setView([56.2639, 9.5018], 13); // Fixed the method to use 'map' instead of 'L.map'
        }
    }
    
}).mount('#app')

