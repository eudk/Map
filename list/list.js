const app = Vue.createApp({
    data() {
        return {
            searchString: null
        };
    },

    methods: {
        submit(){

        }
    },
    mounted() {
        console.log('mounted');
    }
});

app.mount('#app');