const baseurl="https://naturdanmark-api20231124193012.azurewebsites.net"

const app = Vue.createApp({
    data() {
        return {
            observation:[],
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
                const response = await axios.get(url +"/Api/Observation/" + id)
                console.log("a")
                this.observation = response.data
                console.log("b")
            }
            catch(ex)
            {
                alert(ex.message)
            }
            
        },
    },
});

app.mount('#app');
