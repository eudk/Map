const app = Vue.createApp({
    data() {
        return {
            buttonText: 'Indsend',
            map: null,

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
            const maximumFileSize = MB*4;
            var uploadField = document.getElementById("photo");

            if(uploadField.files[0].size > 1){
                alert("File is too big!");
                uploadField.value = "";
            };
        },
        
        submitForm() {
            alert('Observation oprettet!');
            window.location.href = '../map.html';
            return false;
        },

        // Metode til at vise kortet
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

            
        }



    },
});

app.mount('#app');
