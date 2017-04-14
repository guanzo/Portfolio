<template>
    <transition name="fade" appear>
        <div class="text-left section">
            
            <h4>Technologies I enjoy</h4>
            <div class="guess">
                <span>Can you guess what they are?</span>
                <div class="interactions">
                    <span @click="onShuffle">Shuffle</span> |
                    <span @mouseover="onReveal" @mouseout="onHide">Reveal</span>
                </div>
            </div>
            
            <transition-group tag="div" class="technologies">
                <div class="technology z-depth-1" v-for="tech in technologies" :key="tech.name" :class="tech.class" 
                            @mouseover="tech.class = 'reveal'" @mouseout="tech.class = ''" >
                    <img :src="tech.imgSrc" >
                    <div>
                        <b>{{ tech.name }}</b>
                        <span v-html="tech.text"></span>
                    </div>
                </div>
            </transition-group>
            
            <p class="jquery-joke">
                I am a recovering jQuery user. It's been {{ timeSincejQuery }} days since my last use.
            </p>
            <p></p>
        </div>
    </transition>
</template>

<script>
//import shuffle from './lodash/shuffle'
import shuffle from 'lodash/shuffle'
import * as d3 from "d3";
export default {
    data () {
        return {
            technologies:[
                {
                    imgSrc:'assets/images/htmlcssjs.png', 
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
                    imgSrc:'https://www.codeforest.net/wp-content/uploads/2013/05/backbone.png', 
                    name:'Backbone.js',
                    text:'My first framework',
                    class:'',
                },
                {
                    imgSrc:'https://zeroc.com/images/logos/languages/java-b48c6193e3.svg', 
                    name:'Java',
                    text:'It\'s not "cool" anymore, but still reliable!',
                    class:'',
                },
                {
                    imgSrc:'assets/images/less.png', 
                    name:'Less',
                    text:'Okay, this one is a gimme',
                    class:'',
                },
                {
                    imgSrc:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Boostrap_logo.svg/2000px-Boostrap_logo.svg.png', 
                    name:'Bootstrap',
                    text:'',
                    class:'',
                },
                {
                    imgSrc:'http://www.freeiconspng.com/uploads/sql-server-icon-png-1.png', 
                    name:'SQL-Server',
                    class:'',
                },
                {
                    imgSrc:'assets/images/tomcat.png', 
                    name:'Apache Tomcat',
                    text:'I have 2 cats',
                    class:'',
                },
                {
                    imgSrc:'http://objectpartners.github.io/react-workshop/assets/img/flux-logo.png', 
                    name:'Flux Architecture',
                    text:'Vuex is my current go-to flux implementation',
                    class:'',
                },
            ],
        }   
    },
    computed:{
        timeSincejQuery(){
            var milliseconds = new Date() - new Date('3-1-2017');
            var days = Math.round(milliseconds / (1000*60*60*24));
            return days;
        }
    },
    created(){
        this.technologies = shuffle(this.technologies)
    },
    methods:{
        onReveal(){
            this.technologies.forEach(d=>d.class = 'reveal')
        },
        onHide(){
            this.technologies.forEach(d=>d.class = '')
        },
        onShuffle(){
            this.technologies = shuffle(this.technologies)
        },
    },
    
}
</script>

<style lang="less">
.z-depth-1{
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
}

</style>

<style scoped lang="less">


.guess{
    position: relative;
    top:-20px;
    display:flex;
    justify-content: space-between;
}

.interactions{
    span{
        cursor: pointer;
    }
    span:last-child{
        cursor: default;
    }
}

@media (max-width: 750px) {
    .technologies{
        justify-content: space-around;
    }
}

.technology-move {
  //transition: transform 1s;
}

.technologies, {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    text-align: center;
    font-size: 1.3rem;
    color: #333;
    .technology{
        position: relative;
        overflow: hidden;
        align-self: stretch;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 5s, box-shadow 0.75s, transform 1s;
        border-radius: 50%;
        max-width: 125px;
        max-height: 125px;
        padding: 5px;
        margin: 5px;
        &:hover{
            //box-shadow: 0px 0px white , 0px 0px white, 0px 0px white;
        }
        &.reveal > div{
            transform: translateY(0);
        }
        &.reveal > img{
            filter: blur(3px);
        }
        >div{
            position: absolute;
            transform: translateY(-100%);
            will-change: transform;
            left:0;
            height:100%;
            width:100%;
            background-color:rgba(255,255,255,0.75);
            transition: 0.75s;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding:5px;
        }
        >img{
            max-width: 125px;
            height:auto;
            transition: 0.75s;
            will-change: filter;
        }   
    }
}


.jquery-joke{
    margin: 30px 0px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
