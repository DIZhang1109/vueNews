/**
 * Created by Di on 3/05/17.
 */

/*global Vue*/
/*global axios*/

new Vue({
    el: 'app',
    template: `
        <div id="view">
    		<h3 align="center">{{ title }}</h3>
    		<div align="center">
    			<select v-model="selected">
    				<option value="">Home</option>
    				<option v-for="section in newSections">{{ section }}</option>
    			</select>
    			<button @click="retrieveNews(selected)">Retrieve</button><br>
    		</div>
    		<h4>Top Stories of {{ selected }} Today: {{ news.length }}</h4>
    		<ul>
    			<li v-for="item in news">
    				{{ item.title }}<br>
    				<div v-if="item.multimedia.length >= 1">
    					<img :src="item.multimedia[1].url"><br>
    				</div>
    				{{ item.abstract }}
    			</li>
    		</ul>
		</div>
    `,
    data: {
        title: 'Vue Top News',
        news: [],
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
        selected: ''
    },
    methods: {
        retrieveNews: function(section) {
            if (section == '') {
                section = 'Home';
            }
            axios.get('//api.nytimes.com/svc/topstories/v2/' + section.toLowerCase() + '.json?api-key=23bd2416129e4997bc0009d118e1e635')
                .then(response => {
                    this.news = response.data.results;
                })
                .catch(error => console.log(error));
        }
    },
    computed: {
        newSections: function() {
            return this.sections.sort().map(section => section.charAt(0).toUpperCase() + section.slice(1).toLowerCase());
        }
    },
    mounted() {
        this.retrieveNews('');
    }
})
