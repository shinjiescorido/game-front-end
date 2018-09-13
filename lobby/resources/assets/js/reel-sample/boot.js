import Vue from 'vue'
import axios from 'axios'
import groups from './processed.json'
new Vue({
    el: '#app',

    data: {
        disable: false,
        groups
    },

    methods: {
        play (game) {
            this.disable = true
            axios.post('/betsoft/token').then(({data}) => {
                this.disable = false
                let url = `https://bluefrog-gp3.discreetgaming.com/cwstartgamev2.do`
                url += `?bankId=2218&gameId=${game.id}&mode=real&token=${data.payload}&lang=en`
                window.location.href = url;
            })
        }

    }
});
