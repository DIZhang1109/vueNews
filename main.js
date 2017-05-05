/**
 * Created by Di on 3/05/17.
 */

/*global Vue*/
/*global axios*/

new Vue({
    el: 'app',
    template: `
        <v-app id="example-1">
          <v-toolbar>
            <v-toolbar-title class="text-xs-center">{{ title }}</v-toolbar-title>
          </v-toolbar>
          <v-container fluid="fluid" class="mt-1">
            <v-row class="ma-1">
              <v-col xs3 offset-xs3>
                <v-card class="elevation-0">
                  <v-select
                      :items="newSections"
                      v-model="selected"
                      label="News Section"
                      light
                      single-line
                      auto
                  />
                </v-card>
              </v-col>
              <v-col xs1 offset-xs1>
                <v-card class="elevation-0">
                  <v-card-text class="text-xs-center">
                    <div>
                      <v-btn light flat @click.native="retrieveNews(selected)">
                        Retrieve
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row class="pa-2">
              <v-col xs3 v-for="item in news" :key="item" class="pa-3">
                <v-card>
                  <v-card-row class="blue-grey darken-1">
                    <v-card-title>
                      <span class="white--text">{{ item.title }}</span>
                      <v-spacer></v-spacer>
                    </v-card-title>
                  </v-card-row>
                  <div v-if="item.multimedia.length >= 1">
                    <v-card-row :style="{ background: 'url(' + item.multimedia[1].url + ')' }" height="150px"></v-card-row>
    			  </div>
                  <v-card-text class="blue-grey darken-3 white--text">
                    {{ item.abstract }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-app>
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
