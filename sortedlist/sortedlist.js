const app = Vue.createApp({
    data() {
        return {
            map: null,
            longitude: null,
            latitude: null,
            prettyCoordinates: null,
            cityName: '',
            searchString: '',
            setamount: 20,
            observations: null
        };
    },
    methods: {  
        async getCityFromCoordinates(lat, lng) {
            try {
                const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
                return response.data.city || response.data.locality || 'Unknown Location';
            } catch (error) {
                console.error('Error fetching city name:', error);
                return 'Unknown Location';
            }
        },
        
        async submitForm() {
            try {
                if (this.prettyCoordinates == null) {
                    alert('Please choose a location on the map');
                    return;
                }
                const params = new URLSearchParams({
                    sortMethod: 'distance',
                    longitude: this.longitude,
                    latitude: this.latitude,
                    amount: this.setamount,
                    AnimalName: this.searchString
                });
        
                // Fetch observations from  API
                const response = await axios.get("https://naturdanmark-api20231124193012.azurewebsites.net/Api/Observation?" + params.toString());
                this.observations = response.data;
        
                for (let observation of this.observations) {
                    observation.cityName = await this.getCityFromCoordinates(observation.latitude, observation.longitude);
                }
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        },


        // Metode til at vise kortet
        initializeMap() {
               // Initialize the map
            var map = L.map('small-map').setView([56.2639, 9.5018], 6);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                maxZoom: 18,
            }).addTo(map);
       
            var pin = L.marker(map.getCenter()).addTo(map);
            
            map.on('move', function(e) {
                pin.setLatLng(map.getCenter());
            // map._renderer._update();          
            });
            this.map = map;
        },



        getCurrentLocation(){
            //TODO
        },
        


        getPinLocation() {
            
            const rawLng = this.map.getCenter().lng;
            const scrollDirection = Math.sign(rawLng);
            const mapLoopIdentifier = rawLng < -180 ? -1 : rawLng > 180 ? 1 : 0;
            const hemisphere = (Math.abs(rawLng) % 360 < 180 ? 1 : -1) * scrollDirection; //1 = East, -1 = West
            
            const correction = -(mapLoopIdentifier * hemisphere);
            this.longitude = ((correction == 1 ? 180 : 0) + (Math.abs(rawLng) % 180)*(correction == 1 ? -1 : 1))*hemisphere;

            this.latitude = this.map.getCenter().lat;

            this.prettyCoordinates = this.convertGeographicCoordinateFormat(this.latitude, this.longitude);

            console.log(this.longitude);
            console.log(this.latitude);
        
            // Fetch city name using reverse geocoding API
            const reverseGeocodeApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${this.latitude}&longitude=${this.longitude}&localityLanguage=en`;
        
            axios.get(reverseGeocodeApiUrl)
            .then(response => {
                this.cityName = response.data.locality;
            })
            .catch(error => {
                console.error('Error fetching city name:', error);
            });
           
        },

        convertGeographicCoordinateFormat(lat, lng) {
            
            const absDegLat = Math.abs(lat);
            const degLat = Math.floor(absDegLat);
            const minLat = Math.floor(60 * (absDegLat - degLat));
            const secLat = Math.round(3600 * (absDegLat - degLat) - 60 * minLat);
            const latNS = Math.sign(lat) == 1 ? "N" : "S";

            const absDegLng = Math.abs(lng);
            const degLng = Math.floor(absDegLng);
            const minLng = Math.floor(60 * (absDegLng - degLng));
            const secLng = Math.round(3600 * (absDegLng - degLng) - 60 * minLng);
            const lngEW = Math.sign(lng) == 1 ? "E" : "W";

            return `${degLat}° ${minLat}\' ${secLat}\" ${latNS}, ${degLng}° ${minLng}\' ${secLng}\" ${lngEW}`;
        },


        initialize(){
            this.initializeMap();
        }
        

    },

    mounted() {
        this.initialize();
        console.log('mounted');
    }
});

app.mount('#app');