

Vue.component('film-view', {
    template: '#film-view-html',
    props: ['value'],
    data() {
        return {};
    },
    methods: {
        clickFilm() {
            this.$emit('clickedfilm', this.value);
        }
    }
});

Vue.component('detailed-film-view', {
    template: '#detailed-film-view-html',
    props: ['value'],
    data() {
        return {};
    },
    methods: {
        onClickGoBack() {
            this.$emit('gotogridview');
        }
    }
});

new Vue({
    el: '#app',
    data: {
        filmArray: [],
        pageData: {},
        searchName: '',
        showGridView: true,
        detailedFilm: {}
    },
    methods: {
        populateFilmArray(response) {
            this.filmArray = response.data.results;
            this.pageData = response.data;
        },
        searchFilms() {
            if (this.searchName === "") {
                axios.get('/popularFilms').then(this.populateFilmArray);
            } else {
                axios.get('/searchFilms?name=' + this.searchName).then(this.populateFilmArray);
            }
        },
        clickedFilm(film) {
            axios.get('/getFilm?filmId=' + film.id).then((response) => {
                this.showGridView = false;
                this.detailedFilm = response.data;
            });
        },
        gotoGridView() {
            this.showGridView = true;
        }
    },
    mounted() {
        axios.get('/popularFilms').then(this.populateFilmArray);
    }
});
