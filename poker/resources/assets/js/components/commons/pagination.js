var pagination = Vue.component('pagination', {
    template: `
        <ul v-if="store.total" class="pagination">
            <button class="btnpagination" :disabled="!store.prev_page_url" @click="update(store.prev_page_url)">
                <i class="fa fa-chevron-left"></i> Previous
            </button>
            <button @click="update(page)" :class="{'pagenum numactive': page == store.current_page, 'pagenum': page != store.current_page}" v-for="page in pages">
                {{ page }}
            </button>
            <button class="btnpagination" :disabled="!store.next_page_url" @click="update(store.next_page_url)">
                Next <i class="fa fa-chevron-right"></i>
            </button>
        </ul>
    `,

    props: {
        src: {
            required: true
        },

        params: {
            type: Object
        },

        base: {
            type: String
        },

        store: {
            type: Object,
            twoWay: true
        },

        loading: {
            type: Boolean,
            twoWay: true,
            required: false
        },

        rows: {
            type: Number,
            twoWay: false,
            required: false
        },
    },

    data () {
        return {
            limit: 5,
            pages: []
        };
    },

    created () {
        this.init();
    },

    computed: {
        // starting page of current block
        start () {
            return Math.floor(this.store.current_page / this.limit) * this.limit || 1;
        },

        // get ending page of current block
        end () {
            if (this.start + this.limit < this.store.last_page) {
                return this.start + this.limit;
            }

            return this.store.last_page;
        },

        pages () {
            let pages = [];
            for (let index = this.start; index <= this.end; index++) {
                pages.push(index);
            }
            return pages;
        }
    },

    watch: {
        params: {
            handler () {
                this.update(1);
            },
            deep: true
        }
    },

    methods: {

        init () {
            if (typeof this.src == 'string') {
                this.update(this.src);
            }

            if (this.src instanceof Object) {
                this.store = this.src;
            }
        },

        update (url) {
            if (!url) {
                return;
            }

            if (typeof url == 'number') {
                url = this.base + '?page=' + url;
            }

            let params = {};
            params['params'] = this.params;

            // if (this.rows) {
            //     params['rows'] = this.rows;
            // }

            this.loading = true;
            this.$http.get(url, {params}).then(response => {
                this.store = response.body; //JSON.parse(response.body);
                this.$emit('change');
                this.loading = false;
            });
        }
    }
});

require('./betrecords');