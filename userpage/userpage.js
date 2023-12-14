const baseurl = "https://naturdanmark-api20231124193012.azurewebsites.net";

const app = Vue.createApp({
    data() {
        return {
            Username:""
        };
    },
    async created()
    {
        await this.mounted()
    },
    methods:
    {
        async mounted() 
        {
            console.log('mounted')
            try{
                this.Username = await sessionStorage.getItem('name')
            }
            catch(ex)
            {
                alert(ex)
            }
        }
    }

});

app.mount("#app")