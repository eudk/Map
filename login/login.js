const baseurl = "https://naturdanmark-api20231124193012.azurewebsites.net";

const app = Vue.createApp({
    data() {
        return {
            inputName: "",
            outputName: "",
        };
    },
    methods: {
        put() {
            this.outputName = this.inputName.get("") 
                try {
                    if (this.outputName == "") throw "Name can't be empty"
                }
                catch(error) {
                    outputName.innerHTML = error
                }
            },
        storename() {
            sessionStorage.setItem('name', this.outputName)
        }
    },

    mounted() {
        console.log('mounted');
    }
});

app.mount("#app")