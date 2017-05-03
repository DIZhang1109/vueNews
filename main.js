/**
 * Created by Di on 3/05/17.
 */
const vm = new Vue({
    el: '#vue-news',
    data: {
        title: 'Vue News',
        news: [],
        newsAmount: '',
        selected: '',
        sections: [
            'opinion',
            'world',
            'national',
            'politics',
            'upshot',
            'nyregion',
            'business',
            'technology',
            'science',
            'health',
            'sports',
            'arts',
            'books',
            'movies',
            'theater',
            'sundayreview',
            'fashion',
            'tmagazine',
            'food',
            'travel',
            'magazine',
            'realestate',
            'automobiles',
            'obituaries',
            'insider'
        ],
        formalSection: []
    },
    methods: {
        retrieveNews: function (selected) {
            if (selected === '') {
                selected = 'Home';
            }
            axios.get('http://api.nytimes.com/svc/topstories/v2/' + selected.toLowerCase() + '.json?api-key=23bd2416129e4997bc0009d118e1e635')
                .then(response => this.news = response.data.results)
                .catch(error => console.log(error))
        }
    },
    created() {
        this.sections = this.sections.sort();
        this.formalSection = this.sections.map(section => section.charAt(0).toUpperCase() + section.slice(1).toLowerCase());
    },
    mounted() {
        axios.get('http://api.nytimes.com/svc/topstories/v2/home.json?api-key=23bd2416129e4997bc0009d118e1e635')
            .then(response => this.news = response.data.results)
            .catch(error => console.log(error))
    }
});