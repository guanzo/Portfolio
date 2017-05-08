import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const SELECT_PROJECT = 'SELECT_PROJECT';
export const SELECT_IMAGE = 'SELECT_IMAGE';
export const TAKE_CANDY = 'TAKE_CANDY';
export const OFFER_CANDY = 'OFFER_CANDY';

export default new Vuex.Store({
	state: {
        selectedProject:0,
        selectedImage:0,
        navbarBackground:'',
        candyTaken: false,
        candyOffered: false,
        organizations:[

        ],
        projects:[
            {
                name:'Blue Edge',
                tagline:'Predictive Analytics',
                startDate: 'April 2017',
                background:'linear-gradient(to right, #007dcc , #005C97)',
                color:'white',
                selectedImage:0,
                imgs:['be_splash.png','be_profile.png','be_scenario.png'],
            },
            {
                name:'New Business Generator',
                tag:'Business Intelligence',
                startDate: 'March 2016',
                background:'linear-gradient(to bottom, #354835 , #779377)',
                color:'white',
                tagline:0,
                imgs:['nbg_customer.png','nbg_platform.png','nbg_region.png','nbg_choropleth.png']
            },
            {
                name:'Relevance Engine',
                tag:'News Aggregator',
                startDate: 'May 2015',
                background:'linear-gradient(to right, #02488e , #118bef)',
                color:'white',
                tagline:0,
                imgs:['re_dashboard.png','re_docspace.png','re_cdd.png','re_email.png']
            }
        ],
        links: [
            {
                url:'https://github.com/guanzo',
                icon:'fa-github'
            },
            {
                url:'https://www.linkedin.com/in/eric-guan-6a050547',
                icon:'fa-linkedin',
            },
            {
                url:'http://stackoverflow.com/users/2498782/eric-guan',
                icon:'fa-stack-overflow'
            },
        ],
        technologies:[
                {
                    imgSrc:'assets/images/technologies/htmlcssjs.png', 
                    name:'HTML, CSS, JS',
                    text:'',
                    class:'',
                    style:'transform: translateY(10px);'
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
                    style:'transform: translateY(10px);'
                },
                {
                    imgSrc:'assets/images/technologies/lodash.png', 
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
                    imgSrc:'assets/images/technologies/less.png', 
                    name:'Less',
                    text:'Okay, this one is a gimme',
                    class:'',
                },
                {
                    imgSrc:'assets/images/technologies/leaflet.jpg', 
                    name:'Leaflet.js',
                    text:'Makes mapping a breeze',
                    class:'',
                },
                {
                    imgSrc:'assets/images/technologies/grunt.png', 
                    name:'Grunt',
                    text:'My first build tool',
                    class:'',
                },
                {
                    imgSrc:'assets/images/technologies/npm.png', 
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
                    imgSrc:'assets/images/technologies/sql-server.png', 
                    name:'SQL Server',
                    class:'',
                },
                {
                    imgSrc:'assets/images/robot.svg', 
                    name:'ABR',
                    text:'A somewhat reliable robot butler.',
                    class:'',
                },
                {
                    imgSrc:'assets/images/technologies/tomcat.png', 
                    name:'Apache Tomcat',
                    text:'I have 2 cats',
                    class:'',
                },
                {
                    imgSrc:'http://objectpartners.github.io/react-workshop/assets/img/flux-logo.png', 
                    name:'Flux',
                    text:'Vuex is my current go-to flux implementation',
                    class:'',
                },

        ],
    },
	mutations:{
		[SELECT_PROJECT] (state, payload){
			state.selectedProject = payload.index
		},
        [SELECT_IMAGE] (state, payload){
			state.selectedImage = payload.index
		},
        [TAKE_CANDY] (state){
            state.candyTaken = true;
        },
        [OFFER_CANDY] (state){
            state.candyOffered = true;
        }
	},
    getters:{
        activeProject: state => {
            return state.projects[state.selectedProject]
        },
        activeImage: (state, getters) => {
            let project = getters.activeProject
            return project.imgs[state.selectedImage]
        },
        totalImageIndex: (state, getters) => {
            let projects = state.projects;
            let activeProject = getters.activeProject
            let index = projects.indexOf(activeProject)
            let totalIndex = 0;
            for(let i=0; i<index; i++)
                totalIndex += projects[i].imgs.length;
            totalIndex += state.selectedImage;
            return totalIndex;
        }
    }
})
