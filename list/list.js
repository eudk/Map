const baseurl="https://naturdanmark-api20231124193012.azurewebsites.net"
const baseurlsearch="https://naturdanmark-api20231124193012.azurewebsites.net/Api/Observation?fromToday=true&sortMethod=datedesc"

const app = Vue.createApp({
    data() {
        return {
            searchString: null,
            observations:[]
        };
    },
    async created()
    {
        this.CreatedToday(baseurlsearch)
    },
    methods: {
        submit(){

        },
        async CreatedToday(url)
        {
            try
            {
                const response= await axios.get(baseurlsearch)
                this.observations=response.data
                console.log("data created")
            }
            catch(ex)
            {
                alert(ex.message)
            }
            
        }
    },
    mounted() {
        console.log('mounted');
    }
});

app.mount('#app');