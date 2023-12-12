const baseurl = "https://naturdanmark-api20231124193012.azurewebsites.net";

const app = Vue.createApp({
    data() {
        return {
            inputName: "",
            outputName: "",
            checked: false
        };
    },

    method: {
        put() {
            this.outputName = this.inputName.get("Login: " + "")
            if (this.outputName == null){
                try {
                    if (this.outputName == "") throw "Name can't be empty"
                }
                catch(error) {
                    outputName.innerHTML = error
                }
            }
        },

        storename(){
            sessionStorage.setItem('name', outputName)
        }
    },

    mounted() {
        console.log('mounted');
    }
});

app.mount("#app")