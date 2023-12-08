
const app = Vue.createApp({
    data() {
        return {
            map: null,
            markers: [],
            buttonText: 'Zoom In', // skal bruge ellers skifter den ikke navn
            animalFilter: '',
            loading: true, 
            image: null
                };
    },


    methods: {
        initializeMap() {
            this.map = L.map('map').setView([56.2639, 9.5018], 7);
            const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);

            // Fetch observation data from the database and add markers
            this.fetchObservations();
        },


        getid(tempid){

            sessionStorage.setItem('id', tempid)
        },


        fetchObservations() {
            this.markers.forEach((marker) => {
                this.map.removeLayer(marker);
            });

            const API_URL = 'https://naturdanmark-api20231124193012.azurewebsites.net/Api/Observation';
        
            axios.get(API_URL, { params: { 'amount': 50, 'sortMethod': 'datedesc', 'AnimalName': this.animalFilter} }) //50 observations limit
                .then(response => {
                    const observations = response.data;
                        observations.forEach(observation => {
                        const dateTime = observation.date.split('T');

                        const marker = L.marker([observation.latitude, observation.longitude]);

                        marker.on('mouseover', async () => {
                            await this.GetData("https://naturdanmark-api20231124193012.azurewebsites.net", observation.id);

                            const markerContent = `                           
                            <img src="${this.image}" alt = "This observation has no photo" style="max-width: 80%; margin-top: 10px;"> <br>                          
                            <strong>Animal Name:</strong> ${observation.animalName}<br>
                            <strong>Date:</strong> ${dateTime[0]}<br>
                            <strong>Time:</strong> ${dateTime[1]}<br>
                            <strong>Description:</strong> ${observation.description || ''}
                            <a href="list/read/read.html" class="btn btn-success rounded-pill" id="details-${observation.id}">Details</a>`;


                            marker.bindPopup(markerContent);
                        });

                        marker.on('popupopen', () => {
                            const detailsLink = document.getElementById(`details-${observation.id}`);
                            detailsLink.addEventListener('click', () => {
                                this.getid(observation.id);
                            });
                        });
                        this.map.addLayer(marker);
                        this.markers.push(marker);
                    });
                    this.map.setView([56.2639, 9.5018], 7);
                })
                .catch(error => {
                    console.error('Error fetching observations:', error);
                })
                .finally(() => {
                    this.loading = false;  // loading stops
                });


      },

      async GetData(url, id)
      {
          try
          {
              var response = await axios.get(url +"/Api/Observation/" + id)
              this.observation = response.data
              console.log(this.observation.id)
              response = await axios.get(url +"/Api/Image?id=" + this.observation.id)
              this.image = response.data.photo
              console.log(response.data.photo)
              return 0
          }
          catch(ex)
          {
            this.image = null;
            console.log( ex.message)
            return 1
          }
          
        },
    

        /*filterObservationsByAnimal(){
            this.markers.forEach((marker) => {
                this.map.removeLayer(marker);
            });
            const filterArray = this.markers.filter((marker) => marker.getPopup().getContent().split("<br>")[0].split("</strong> ")[1].toLowerCase().includes(this.animalFilter.toLowerCase()));
            filterArray.forEach((marker) => {
                this.map.addLayer(marker);
            });
        },*/

        // Knap til at zoome ind og ud metode (:
        zoomCurrentLocation() {
            if (this.buttonText === 'Zoom In') {
                this.buttonText = 'Center';
                this.map.setView([56.2639, 9.5018], 13);
            } else {
                this.buttonText = 'Zoom In';
                this.map.setView([56.2639, 9.5018], 7);
            }
        }
    },
    mounted() {
        this.initializeMap();
        console.log('mounted');
    },
});
// Loading spinnner evt. kan vi ændr loading navn her
app.component('loading-spinner', {
    template: `
        <div v-if="loading" class="loading-spinner">
            Loading observations... 
        </div>
    `,
    props: ['loading'],
});

app.mount('#app');

