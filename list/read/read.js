const baseurl="https://naturdanmark-api20231124193012.azurewebsites.net"

const app = Vue.createApp({
    data() {
        return {
            observation:[],
            image:null
        };
    },
    async created()
    {
        tempid = sessionStorage.getItem('id')
        this.GetData(baseurl, tempid)
    },
    methods: {
        async GetData(url, id)
        {
            try
            {
                console.log("z")
                var response = await axios.get(url +"/Api/Observation/" + id)
                console.log("a")
                this.observation = response.data
                console.log("b")
                console.log(this.observation.id)
                response = await axios.get(url +"/Api/Image?id=" + this.observation.id)
                this.image = response.data.photo
                console.log(response.data.photo)


            }
            catch(ex)
            {
            console.log( ex.message)
            }
            
        },



    },
});

app.mount('#app');
