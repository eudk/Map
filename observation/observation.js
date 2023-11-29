const app = Vue.createApp({
    data() {
        return {
            buttonText: 'Indsend',
            map: null,
            longitude : null,
            latitude : null

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

        getPinLocation() {
            
            this.longitude = this.map.getCenter().lng;
            this.latitude = this.map.getCenter().lat;
            console.log(this.longitude);
            console.log(this.latitude);
           
        }

    

    },
    mounted() {
        this.initializeMap();
    },
});


app.mount('#app');
