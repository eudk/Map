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

        logout() {
            sessionStorage.removeItem('name'); 
            this.Username = 'Anonymous'; 
        },



        async mounted() 
        {
            console.log('mounted')
            try{
                this.Username = await sessionStorage.getItem('name') //get username from sessionStorage
            }
            catch(ex)
            {
                alert(ex)
            }
        }
    }

});

app.mount("#app")