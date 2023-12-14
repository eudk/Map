const baseurl="https://naturdanmark-api20231124193012.azurewebsites.net"
const baseurlsearch="https://naturdanmark-api20231124193012.azurewebsites.net/Api/Observation?fromToday=true&sortMethod=datedesc&amount=2147483647"

const app = Vue.createApp({
    data() {
        return {
            searchString:"",
            observations:[],
            setamount:20,
            datetime:[]
        };
    },
    async created()
    {
        this.CreatedToday(baseurl)
    },
    methods: {
        submit(){
            this.CreatedToday(baseurl)
            console.log("searched")

        },
        async CreatedToday(url,amount=this.setamount)
        {
            try
            {
                this.setamount=amount
                const response= await axios.get(url+"/Api/Observation?sortMethod=datedesc&amount="+this.setamount + "&AnimalName=" + this.searchString)
                this.observations=response.data
                console.log("data created")
            }
            catch(ex)
            {
                alert(ex.message)
            }
        },

        getid(tempid){

            sessionStorage.setItem('id', tempid) 
        }
    },
    mounted() {
        console.log('mounted');
    }
});

app.mount('#app');