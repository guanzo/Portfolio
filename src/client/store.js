import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const SELECT_PROJECT = 'SELECT_PROJECT';
export const CLOSE_PROJECT = 'CLOSE_PROJECT';
export const CHANGE_BACKGROUND = 'CHANGE_BACKGROUND'
export const CHANGE_PROJECTS_BACKGROUND = 'CHANGE_PROJECTS_BACKGROUND'


let store = new Vuex.Store({
	state: {
        selectedProject:-1,
        selectedImage:0,
        navbarBackground:'',
        gradientIndex: 0,
        gradients:[
            ['#da7352','#d64759'],//red/orange
            ['#38aecc','#2E3192'],//blue
            ['#030303','#030303'],///black, replaced by green during projects intro
            ['#faf0cd','#fab397']
        ],
        organizations:[

        ],
        projects:[
            {
                name:'Blue Edge',
                tag:'Predictive Analytics',
                startDate: 'April 2017',
                desc:`A tool that attempts to predict aircraft acquisitions and         retirements based on historical economic conditions. As Aviall is an aviation products distributor, knowing when a customer might make changes to their fleet can give Aviall the competitive edge.
                <br><br>
                My first project with Vue. I fell in love.
                Guanzo Manor was built with Vue!`,
                color1:'#007dcc',
                color2:'#005C97',
                selectedImage:0,
                screens:[
                        {
                            img:'be_splash.png',
                        },
                        {
                            img:'be_profile.png',
                            label: { 
                                title:'The Economic Landscape', 	
                                desc:'GDP, fuel price, yearly income, public relations, and much more. How is it all connected?' 
                            }
                        },
                        {
                            img:'be_scenario.png',
                            label: { 
                                title:'Learning from the Past', 	
                                desc:'Can we predict behavior by modeling historic values?' 
                            }
                        }
                    ],
                script:[
                    {speaker:'man', line:"", duration:3000},
                    {speaker:'robot', line:""},
                ]
            },
            {
                name:'New Business Generator',
                tag:'Business Intelligence',
                startDate: 'March 2016',
                desc:`The NBG provides a high level overview of the state of Avialls business. It analyzes millions of invoices, aviation products, customer fleets, and other data points to infer sales opportunities for Aviall. Users are given a sensible starting point for their sales strategies.
                <br><br>
                I created this application from the ground up. Many mistakes were made, and many more lessons were learned. Writing this application taught me a lot about web development.`,
                color1:'#354835',
                color2:'#779377',
                screens:[
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
                script:[
                    {speaker:'man', line:"This project was my first full fledged web application, built by myself.", duration:3000},
                    {speaker:'robot', line:"fun fact: jquery leads to spaghetti code!"},
                ]
            },
            {
                name:'Relevance Engine',
                tag:'News Aggregator',
                startDate: 'May 2015',
                desc:`Relevant aviation industry news is collected and displayed in real time. The Relevance Engine continues to improve the sales and cost savings of Aviall by millions of dollars. 
                <br><br>
                This was an existing application that I inherited.`,
                color1:'#02488e',
                color2:'#118bef',
                screens:[
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
                script:[
                    {speaker:'man', line:"I inherited this as my first project at my first job."},
                    {speaker:'man', line:"It taught me to stay away from GWT"},
                    {speaker:'robot', line:"fun fact: building ui with java is no fun!"},
                ]
            }
        ],
        links: [
            {
                url:'https://github.com/guanzo',
                iconClass:'fa-github'
            },
            {
                url:'https://www.linkedin.com/in/eric-guan-6a050547',
                iconClass:'fa-linkedin',
            },
            {
                url:'http://stackoverflow.com/users/2498782/eric-guan',
                iconClass:'fa-stack-overflow'
            },
            {
                url:'http://codepen.io/guanzo/',
                iconClass:'fa-codepen'
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
                    imgSrc:'/images/technologies/html.png', 
                    name:'HTML',
                    text:'',
                    class:'',
                    category:[1]
                },
                {
                    imgSrc:'/images/technologies/css.png', 
                    name:'CSS',
                    text:'',
                    class:'',
                    category:[1]
                },
                {
                    imgSrc:'/images/technologies/js.png', 
                    name:'Javascript',
                    text:'',
                    class:'',
                    category:[1,2,3]
                },
                {
                    imgSrc:'https://avatars1.githubusercontent.com/u/1562726?v=3&s=400', 
                    name:'D3.js',
                    text:'Bring data to life. Limited only by your imagination, and some math.',
                    class:'',
                    category:[1,5]
                },
                {
                    imgSrc:'https://vuejs.org/images/logo.png', 
                    name:'Vue.js',
                    text:'Expressive.<br>Performant.<br>Simple. <br>Fun!',
                    class:'',
                    category:[1,5]
                },
                {
                    imgSrc:'/images/technologies/lodash.png', 
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
                    imgSrc:'https://zeroc.com/images/logos/languages/java-b48c6193e3.svg', 
                    name:'Java',
                    text:'It\'s not "cool" anymore, but still reliable!',
                    class:'',
                    category:[2,3]
                },
                {
                    imgSrc:'/images/technologies/less.png', 
                    name:'Less',
                    text:'Okay, this one is a gimme',
                    class:'',
                    category:[4]
                },
                {
                    imgSrc:'/images/technologies/leaflet.jpg', 
                    name:'Leaflet.js',
                    text:'Makes mapping a breeze',
                    class:'',
                    category:[1]
                },
                {
                    imgSrc:'/images/technologies/grunt.png', 
                    name:'Grunt',
                    text:'My first build tool',
                    class:'',
                    category:[4]
                },
                {
                    imgSrc:'/images/technologies/browserify.png', 
                    name:'Browserify',
                    text:"Don't write spaghetti, write modules",
                    class:'',
                    category:[4]
                },
                {
                    imgSrc:'/images/technologies/npm.png', 
                    name:'npm',
                    text:'Welcome to dependency hell',
                    class:'',
                    category:[4]
                },
                {
                    imgSrc:'/images/technologies/git.png', 
                    name:'git',
                    text:'Essential for any application',
                    class:'',
                    category:[4]
                },
                {
                    imgSrc:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Boostrap_logo.svg/2000px-Boostrap_logo.svg.png', 
                    name:'Bootstrap',
                    text:'',
                    class:'',
                    category:[1]
                },
                {
                    imgSrc:'/images/technologies/sql-server.png', 
                    name:'SQL Server',
                    class:'',
                    category:[2,3]
                },
                {
                    imgSrc:'/images/robot.svg', 
                    name:'Egg',
                    text:'A somewhat reliable robot butler.',
                    class:'',
                    category:[5]
                },
                {
                    imgSrc:'/images/technologies/tomcat.png', 
                    name:'Apache Tomcat',
                    text:'I have 2 cats',
                    class:'',
                    category:[2]
                },
                {
                    imgSrc:'/images/technologies/flux-logo.png', 
                    name:'Flux',
                    text:'Vuex is my current go-to flux implementation',
                    class:'',
                    category:[1,5]
                },

        ],
    },
	mutations:{
        [CHANGE_BACKGROUND] (state, payload){
            state.gradientIndex = payload.index
        },
        [CHANGE_PROJECTS_BACKGROUND] (state, {gradientIndex, gradient}){
            state.gradients.splice(gradientIndex, 1, gradient)
        },
		[SELECT_PROJECT] (state, payload){
			state.selectedProject = payload.index
		},
        [CLOSE_PROJECT] (state){
			state.selectedProject = -1;
		}
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
        activeProject: state => {
            if(state.selectedProject !== -1)
                return state.projects[state.selectedProject]
            else
                return null;
        },
        activeImage: (state, getters) => {
            let project = getters.activeProject
            if(state.selectedProject !== -1)
                return project.imgs[state.selectedImage]
            else
                return null;
        },
    }
})

export default store;