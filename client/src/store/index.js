import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const CHANGE_BACKGROUND = 'CHANGE_BACKGROUND'
export const POST_COMMENT = 'POST_COMMENT'

let store = new Vuex.Store({
	state: {//
        gradientIndex: 0,
        //these gradients are bright, so i need to change the text color to keep it readable
        brightGradientIndexes: [2,3],
        scrolledToProjects: false,
        gradients:[
            ['#da7352','#d64759'],//red/orange
            ['#38aecc','#2E3192'],//blue
            ['#F5F5F5','#F5F5F5'],//white
            ['#faf0cd','#fab397']//peach
        ],
        projects:[
            {
                name:'Data Visualization',
                displayType:'image',
                desc:`
                Through visualization, we can understand huge data sets with our ability to recognize patterns and relationships.<br>
                If presented poorly, data can be hard for humans to parse, or worse, boring!<br>
                If presented correctly, data can be intuitive, not to mention beautiful.
                <br><br>
                Ever since I discovered D3.js, data visualization has become one of my favorite coding pastimes. 
                `,
                slides:[
                        {
                            img:'d3showreel.jpg',
                            label: { 
                                title:'D3 Showreel', 	
                                desc:`
                                Behold the power of D3!
                                <br><br>
                                Live demo <a target="_blank" href="https://bl.ocks.org/guanzo/cda716d75831841ed00a09e6630d26a6">here</a>
                                <br><br>
                                <a href="https://github.com/guanzo/d3-show-reel" target="_blank">Github</a>
                                ` 
                            }
                        },
                        {
                            img:'streamgraphmaker.jpg',
                            label: { 
                                title:'Stream graphs', 	
                                desc:`
                                Stream graphs are my favorite visualizations, so I made a simple tool to create them.
                                <br><br>
                                <a style="text-decoration:underline;" target="_blank" href="https://streamgraphmaker.guanzo.io/">Website link</a>
                                `
                            }
                        },
                    ],
            },
            {
                name:'Vote to Play',
                tag:'Twitch.tv Extension',
                startDate: 'September 2017',
                displayType:'video',
                desc:`This app allows viewers to vote on characters they want the streamer to play. The difference between this
                and other polling apps: Vote to Play is prepopulated with data, so the streamer doesn't have to set up any polls.
                <br><br>
                I put a lot of focus into creating a smooth UI, in order to enhance the stream experience.
                <br><br>
                Supports: Dota 2, League of Legends, Heroes of the Storm, Battlerite, Hearthstone, and Overwatch. 
                <br><br>
                <a href="https://github.com/guanzo/vote-to-play" target="_blank">Github</a>`,
                slides:[
                        {
                            video:'votetoplay_demo1.mp4',
                            label: { 
                                title:'Vote for your hero', 	
                                desc:'Choose a hero that you want to learn, or a troll hero. The streamer is at your mercy!' 
                            }
                        },
                        {
                            video:'votetoplay_demo2.mp4',
                            label: { 
                                title:'Hope your vote wins!', 	
                                desc:'Feel free to brigade the chat in order to push your vote to the top' 
                            }
                        },
                    ],
            },
            {
                name:'Boss',
                tag:'Predictive Analytics',
                startDate: 'April 2017',
                displayType:'image',
                desc:`A tool that attempts to predict aircraft acquisitions and         retirements based on historical economic conditions. As Aviall is an aviation products distributor, knowing when a customer might make changes to their fleet can give Aviall the competitive edge.
                <br><br>
                My first project with Vue. I fell in love.
                Guanzo Manor was built with Vue!
                <br><br>
                <small>Private project for Aviall</small>
                `,
                slides:[
                        {
                            img:'boss_customergrid.png',
                        },
                        {
                            img:'boss_customerprofile.png',
                            label: { 
                                title:'The Economic Landscape', 	
                                desc:'GDP, fuel price, yearly income, public relations, and much more. Many parameters influence a customers behavior' 
                            }
                        },
                        {
                            img:'boss_scenario.png',
                            label: { 
                                title:'Learning from the Past', 	
                                desc:'Predicting aircraft retirements by modeling historic values' 
                            }
                        },
                        {
                            img:'boss_fleetgrid.png',
                        },
                        {
                            img:'boss_fleetstrategy.png',
                            label: { 
                                title:'Retirements & Acquisitions', 	
                                desc:"Some aircraft parts can take years to manufacturer, so knowing how a customer's fleet will change is vital to the business." 
                            }
                        },
                        {
                            img:'boss_partsplanning.png',
                        },
                    ],
            },
            {
                name:'New Business Generator',
                tag:'Business Intelligence',
                startDate: 'March 2016',
                displayType:'image',
                desc:`The NBG provides a high level overview of the state of Aviall's business. It analyzes millions of invoices, aviation products, customer fleets, and other data points to infer sales opportunities for Aviall. Users are given a sensible starting point for their sales strategies.
                <br><br>
                This was my first full fledged SPA, and I created it from the ground up. Many mistakes were made, and many more lessons were learned. Writing this application taught me a lot about web development.
                <br><br>
                <small>Private project for Aviall</small>`,
                slides:[
                        {
                            img:['nbg_region.png','nbg_choropleth.png'],
                            label: { 
                                title:'Around the World', 	
                                desc:'A global company must maintain a high level view of their position. ' 
                            }
                        },
                        {
                            img:'nbg_customer.png',
                            label: { 
                                title:'Customer Profile', 	
                                desc:`The classic customer profile page. Supplemented by a beautiful streamgraph to visualize the aggregate sales over time.` 
                            }
                        },
                        {
                            img:'nbg_platform.png',
                            label: { 
                                title:'Slice and Dice', 	
                                desc:`Sales for an aircraft platform presented through different levels of aggregation.` 
                            }
                        },
                    ],
            },
            {
                name:'Relevance Engine',
                tag:'News Aggregator',
                startDate: 'May 2015',
                displayType:'image',
                desc:`Relevant aviation industry news is collected and displayed in real time. The Relevance Engine continues to improve the sales and cost savings of Aviall. 
                <br><br>
                <small>Private project for Aviall</small>`,
                slides:[
                        {
                            img:'re_dashboard.png',
                            label: { 
                                title:'The Dashboard', 	
                                desc:'Create a customized news dashboard from a variety of sources.' 
                            }
                        },
                        {
                            img:'re_docspace.png',
                            label: { 
                                title:'Document Space', 	
                                desc:`Visualize the industry conversation through a self organizing map.` 
                            }
                        },
                        {
                            img:'re_cdd.png',
                            label: { 
                                title:'Concept Deep Dive', 	
                                desc:`News articles are reduced to core words that define the content. 
                                    Dive deep into a concept through a directed graph.` 
                            }
                        },
                        {
                            img:'re_email.png',
                            label: { 
                                title:'Email Blast', 	
                                desc:`Subscribers to the automated email system stay up to date on the latest industry news.` 
                            }
                        }
                    ],
            }
        ],
        technologyCategories:{
            0:'All',
            1:'Frontend',
            2:'Backend',
            3:'Languages',
            4:'Tools',
            5:'Favorites'
        },
        technologies:[
                {
                    imgSrc: require('@/assets/images/technologies/html.png'), 
                    name:'HTML',
                    text:'',
                    class:'',
                    category:[1]
                },
                {
                    imgSrc: require('@/assets/images/technologies/css.png'), 
                    name:'CSS',
                    text:'',
                    class:'',
                    category:[1]
                },
                {
                    imgSrc: require('@/assets/images/technologies/js.png'), 
                    name:'Javascript',
                    text:'',
                    class:'',
                    category:[1,3,5]
                },
                {
                    imgSrc:'https://avatars1.githubusercontent.com/u/1562726?v=3&s=400', 
                    name:'D3.js',
                    text:'Bring data to life. Limited only by your imagination.',
                    class:'',
                    category:[1,5]
                },
                {
                    imgSrc:'https://vuejs.org/images/logo.png', 
                    name:'Vue.js',
                    text:'Simple.<br>Expressive.<br>Fun!',
                    class:'',
                    category:[1,5]
                },
                {
                    imgSrc: require('@/assets/images/technologies/lodash.png'), 
                    name:'Lodash.js',
                    text:'Useful for<br>any project',
                    class:'',
                    category:[1]
                },
                {
                    imgSrc:'https://www.codeforest.net/wp-content/uploads/2013/05/backbone.png', 
                    name:'Backbone.js',
                    text:'My first javascript framework',
                    class:'',
                    category:[1]
                },
                {
                    imgSrc: require('@/assets/images/technologies/java.png'), 
                    name:'Java',
                    text:'Same thing as Javascript, right?',
                    class:'',
                    category:[3]
                },
                {
                    imgSrc: require('@/assets/images/technologies/sass.png'), 
                    name:'Sass/Scss',
                    text:'',
                    class:'',
                    category:[1,4]
                },
                {
                    imgSrc: require('@/assets/images/technologies/leaflet.jpg'), 
                    name:'Leaflet.js',
                    text:'Makes mapping a breeze',
                    class:'',
                    category:[1]
                },
                {
                    imgSrc: require('@/assets/images/technologies/grunt.png'), 
                    name:'Grunt',
                    text:'My first build tool',
                    class:'',
                    category:[4]
                },
                {
                    imgSrc: require('@/assets/images/technologies/webpack.jpg'), 
                    name:'Webpack',
                    text:"How does it even work?",
                    class:'',
                    category:[4]
                },
                {
                    imgSrc: require('@/assets/images/technologies/npm.png'), 
                    name:'npm',
                    text:'Welcome to dependency hell',
                    class:'',
                    category:[4]
                },
                {
                    imgSrc: require('@/assets/images/technologies/git.png'), 
                    name:'git',
                    text:'Essential for any application',
                    class:'',
                    category:[4]
                },
                {
                    imgSrc:require('@/assets/images/technologies/socketio.gif'), 
                    name:'Socket.IO',
                    text:'',
                    class:'',
                    category:[1,2]
                },
                {
                    imgSrc: require('@/assets/images/technologies/sql-server.png'), 
                    name:'SQL Server',
                    class:'',
                    category:[2,3]
                },
                {
                    imgSrc: require('@/assets/images/robot.svg'), 
                    name:'Egg',
                    text:'A somewhat reliable robot butler.',
                    class:'',
                    category:[5]
                },
                {
                    imgSrc: require('@/assets/images/technologies/tomcat.png'), 
                    name:'Apache Tomcat',
                    text:'I have 2 cats',
                    class:'',
                    category:[2]
                },
                {
                    imgSrc: require('@/assets/images/technologies/node.png'), 
                    name:'Node.js',
                    text:'',
                    class:'',
                    category:[2]
                },
                {
                    imgSrc: require('@/assets/images/technologies/nginx.png'), 
                    name:'nginx',
                    text:'',
                    class:'',
                    category:[2]
                },
                {
                    imgSrc: require('@/assets/images/technologies/firebase.png'), 
                    name:'Firebase',
                    text:'',
                    class:'',
                    category:[2,5]
                },
                {
                    imgSrc: require('@/assets/images/technologies/flux-logo.png'), 
                    name:'Flux',
                    text:'Vuex is my current go-to flux implementation',
                    class:'',
                    category:[1,5]
                },

        ],
    },
	mutations:{
        [CHANGE_BACKGROUND] (state, { gradientIndex }){
            state.gradientIndex = gradientIndex
            if(gradientIndex == 2 && !state.scrolledToProjects)
                state.scrolledToProjects = true;
        },
	},
    actions:{
        [POST_COMMENT] ({commit, state}, {data}){
            return axios.post('/api/comments', { data })
        },
    },
    getters:{
        defaultGradient: state => {
            return state.gradients[0]
        },
        currentGradient: state => {
            return state.gradients[state.gradientIndex]
        },
        gradient: state => index => {
            return state.gradients[index]
        },
    }
})

export default store;