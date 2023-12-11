const baseurl = "https://naturdanmark-api20231124193012.azurewebsites.net";

const app = Vue.createApp({
    data() {
        return {
            observation: [],
            image: null,
            latitude: null,
            longitude: null,
            location: null
        };
    },
    async created() {
        const tempid = sessionStorage.getItem('id'); //get id from sessionStorage
        await this.getData(baseurl, tempid);
    },
    methods: {
        getLocation() {
            return this.location || 'N/A'; //city from api
        },
        
        getFormattedCoordinates() {
            if (this.latitude !== null && this.longitude !== null) {
                return `${this.latitude.toFixed(4)}, ${this.longitude.toFixed(4)}`;
            } else {
                return 'N/A';
            }
        },
    
        async getData(url, id) {
            try {
                console.log("Fetching data");
                const response = await axios.get(url + "/Api/Observation/" + id);
                this.observation = response.data;
                this.latitude = this.observation.latitude;
                this.longitude = this.observation.longitude;
                console.log("Observation ID:", this.observation.id);
        
                // Fetch city name 
                const reverseGeocodeApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${this.latitude}&longitude=${this.longitude}&localityLanguage=en`;
        
                const cityResponse = await axios.get(reverseGeocodeApiUrl);
                this.location = cityResponse.data.locality;
        
                const imageResponse = await axios.get(url + "/Api/Image?id=" + this.observation.id);
                this.image = imageResponse.data.photo;
                console.log("Image URL:", this.image);
                
                this.postObservation();
            } catch (ex) {
                console.error("Error fetching data:", ex.message);
            }
        },
    },
});

app.mount('#app');
