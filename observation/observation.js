const app = Vue.createApp({
    data() {
        return {
            buttonText: 'Indsend',
            map: null,
            longitude : null,
            latitude : null,
            prettyCoordinates : null,
            note : null,
            cityName: null ,
            isInfoPopupVisible: false

        };
    },
    methods: {


        // Metode til data fra dyreapi og vist som liste 
        searchAnimal() {
            const inputElement = document.getElementById('animalSearch');
            const animalName = inputElement.value;

            if (animalName.trim() !== '') {
                const apiKey = 'IYof7GYA8H5s10qs39C6Hw==esi6cp90GJdESuPf'; // API key ændr her hvis det er 
                const apiUrl = `https://api.api-ninjas.com/v1/animals?name=${animalName}`;

               
                axios.get(apiUrl, { headers: { 'X-Api-Key': apiKey } })
                    .then(response => {
                        const animals = response.data;

                        const animalSeenSelect = document.getElementById('animalSeen');
                        animalSeenSelect.innerHTML = '';

                        animals.forEach(animal => {
                            const option = document.createElement('option');
                            option.value = animal.name;
                            option.text = animal.name;
                            animalSeenSelect.appendChild(option);
                        });

                     
                    })
                    .catch(error => {
                        // måske noget til fejl kan ikke få den til at virke
                    });
            } else {
                alert('Indtast dyrets navn.');
            }
        },

        validateFile(event){
            const MB = 1024*1024;
            const maximumFileSize = 30;
            var uploadField = document.getElementById('photo');

            if(uploadField.files[0].size > maximumFileSize * MB){
                alert(`Maximum file size (${maximumFileSize}MB) exceeded!`);
                uploadField.value = '';
            };
        },
        
        postObservation(observationObject){
            const API_URL = `https://naturdanmark-api20231124193012.azurewebsites.net/Api/Observation`
            const xhr = new XMLHttpRequest();
            xhr.open("POST", API_URL);
            xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            const body = JSON.stringify(observationObject);
            xhr.onload = () => {
                if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 201) {
                  console.log(JSON.parse(xhr.responseText));
                } else {
                  console.log(`Error: ${xhr.status}`);
                }
            };
            xhr.send(body);
        },
        
        submitForm() {
            if(this.prettyCoordinates == null){
                alert('Please choose a location on the map');
                return;
            }

            const observerName = document.getElementById('name').value;
            const observedAnimal = document.getElementById('animalSeen').value;
            
            const observeDate = new Date(document.getElementById('date').value);
            const observeTime = document.getElementById('time').value.split(':');
            if(observeTime[2] == 'PM' && observeTime[0] != 12){
                observeTime[0] += 12;
            }
            if(observeTime[2] == 'AM' && observeTime[0] == 12){
                observeTime[0] -= 12;
            } 
            observeDate.setHours(observeTime[0]);
            observeDate.setMinutes(observeTime[1]);
            const observeDateTime = observeDate.toISOString().slice(0, 19) //Convert to MySQL DateTime format

            const observationObject = {id:0, animalName:observedAnimal, date:observeDateTime, description:this.note, longitude:this.longitude, latitude:this.latitude, picture:null};
            this.postObservation(observationObject);
            
            alert('Observation oprettet!');
            //window.location.href = '../map.html';
            //return false;
        },

        
        // info popup metoder
        showInfoPopup() {
            this.isInfoPopupVisible = true;
        },
        closeInfoPopup() {
            this.isInfoPopupVisible = false;
        },
    
        // Metode til at gå tilbage til kortet
       // goToMapPage() {
        //    window.location.href = '/map.html';
       // },

        // Metode til at vise kortet
        initializeMap() {
               // Initialize the map
        var map = L.map('small-map').setView([56.2639, 9.5018], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(map);

  
       
          var pin = L.marker(map.getCenter() 
          
          ).addTo(map);
          
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
        }
        

    

    },
    mounted() {
        this.initializeMap();
        console.log('mounted');
    },
});


app.mount('#app');
