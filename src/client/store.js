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
                background:'linear-gradient(to right, #007dcc , #005C97)',
                mainColor:'#007dcc',
                color:'white',
                selectedImage:0,
                imgs:['be_splash.png','be_profile.png','be_scenario.png'],
                script:[
                    {speaker:'man', line:"My first project with Vue.js. I fell in love.", duration:3000},
                    {speaker:'robot', line:"fun fact: guanzo manor was built with vue!"},
                ]
            },
            {
                name:'New Business Generator',
                tag:'Business Intelligence',
                startDate: 'March 2016',
                background:'linear-gradient(to bottom, #354835 , #779377)',
                mainColor:'#354835',
                color:'white',
                tagline:0,
                imgs:['nbg_choropleth.png','nbg_customer.png','nbg_platform.png','nbg_region.png'],
                script:[
                    {speaker:'man', line:"This project was my first full fledged web application, built by myself.", duration:3000},
                    {speaker:'robot', line:"fun fact: jquery leads to spaghetti code!"},
                ]
            },
            {
                name:'Relevance Engine',
                tag:'News Aggregator',
                startDate: 'May 2015',
                background:'linear-gradient(to right, #02488e , #118bef)',
                mainColor:'#02488e',
                color:'white',
                tagline:0,
                imgs:['re_dashboard.png','re_docspace.png','re_cdd.png','re_email.png'],
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
        technologies:[
                {
                    imgSrc:'/images/technologies/htmlcssjs.png', 
                    name:'HTML, CSS, JS',
                    text:'',
                    class:'',
                },
                {
                    imgSrc:'https://avatars1.githubusercontent.com/u/1562726?v=3&s=400', 
                    name:'D3.js',
                    text:'Bring data to life. Limited only by your imagination, and some math.',
                    class:'',
                },
                {
                    imgSrc:'https://vuejs.org/images/logo.png', 
                    name:'Vue.js',
                    text:'Expressive.<br>Performant.<br>Simple. <br>Fun!',
                    class:'',
                },
                {
                    imgSrc:'/images/technologies/lodash.png', 
                    name:'Lodash.js',
                    text:'Useful for<br>any project',
                    class:'',
                },
                {
                    imgSrc:'https://www.codeforest.net/wp-content/uploads/2013/05/backbone.png', 
                    name:'Backbone.js',
                    text:'My first javascript framework',
                    class:'',
                },
                {
                    imgSrc:'https://zeroc.com/images/logos/languages/java-b48c6193e3.svg', 
                    name:'Java',
                    text:'It\'s not "cool" anymore, but still reliable!',
                    class:'',
                },
                {
                    imgSrc:'/images/technologies/less.png', 
                    name:'Less',
                    text:'Okay, this one is a gimme',
                    class:'',
                },
                {
                    imgSrc:'/images/technologies/leaflet.jpg', 
                    name:'Leaflet.js',
                    text:'Makes mapping a breeze',
                    class:'',
                },
                {
                    imgSrc:'/images/technologies/grunt.png', 
                    name:'Grunt',
                    text:'My first build tool',
                    class:'',
                },
                {
                    imgSrc:'/images/technologies/npm.png', 
                    name:'npm',
                    text:'Welcome to dependency hell',
                    class:'',
                },
                {
                    imgSrc:'https://git-scm.com/images/logos/logomark-orange@2x.png', 
                    name:'git',
                    text:'Essential for any application',
                    class:'',
                },
                {
                    imgSrc:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Boostrap_logo.svg/2000px-Boostrap_logo.svg.png', 
                    name:'Bootstrap',
                    text:'',
                    class:'',
                },
                {
                    imgSrc:'/images/technologies/sql-server.png', 
                    name:'SQL Server',
                    class:'',
                },
                {
                    imgSrc:'/images/robot.svg', 
                    name:'Egg',
                    text:'A somewhat reliable robot butler.',
                    class:'',
                },
                {
                    imgSrc:'/images/technologies/tomcat.png', 
                    name:'Apache Tomcat',
                    text:'I have 2 cats',
                    class:'',
                },
                {
                    imgSrc:'/images/technologies/flux-logo.png', 
                    name:'Flux',
                    text:'Vuex is my current go-to flux implementation',
                    class:'',
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