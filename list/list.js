const baseurl="https://naturdanmark-api20231124193012.azurewebsites.net"
const baseurlsearch="https://naturdanmark-api20231124193012.azurewebsites.net/Api/Observation?fromToday=true&sortMethod=datedesc&amount=2147483647"

const app = Vue.createApp({
    data() {
        return {
            searchString: null,
            observations:[],
            setamount:20
        };
    },
    async created()
    {
        this.CreatedToday(baseurl)
    },
    methods: {
        submit(){

        },
        async CreatedToday(url,amount=this.setamount)
        {
            try
            {
                this.setamount=amount
                const response= await axios.get(url+"/Api/Observation?fromToday=true&sortMethod=datedesc&amount="+this.setamount)
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