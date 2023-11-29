const app = Vue.createApp({
    data() {
        return {
            buttonText: 'Indsend',
            map: null,
            longitude : null,
            latitude : null,
            prettyCoordinates : null

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
        
        submitForm() {
            alert('Observation oprettet!');
            window.location.href = '../map.html';
            return false;
        },

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
            
            this.longitude = this.map.getCenter().lng;
            this.latitude = this.map.getCenter().lat;

            this.prettyCoordinates = this.convertGeographicCoordinateFormat(this.latitude, this.longitude);

            console.log(this.longitude);
            console.log(this.latitude);
           
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
    },
});


app.mount('#app');
