<template>
    <div id="technologies" class="app-section-offwhite">
        <div class="app-section container">
            <h3 class="scrollfire-to-right">Technologies</h3>
            <div class="tech-intro flow-text scrollfire-to-top">
                <p>I pride myself on being a versatile and competent programmer. Being proficient in Javascript, Java, and SQL means that
                    I can contribute to the 3 major pillars of web development: <b>frontend</b>, <b>backend</b>, and the <b>database</b>.
                </p>
                <p>As the state of web development trends more towards complex frontends, 
                    so has my focus increased on staying up to date on modern frontend practices. 
                </p>
                <p>Can you guess the technology by the logo?</p>
            </div>
            <div class="interactions">
                <span @click="onShuffle">Shuffle</span> |
                <span @mouseover="onReveal" @mouseout="onHide">Reveal</span>
            </div>
            
            <transition-group tag="div" class="technology-list flow-text scrollfire-to-top">
                <div class="technology z-depth-2" v-for="tech in technologies" :key="tech.name" :class="tech.class" 
                            @mouseover="tech.class = 'reveal'" @mouseout="tech.class = ''" >
                    <div class="img-wrapper">
                        <img :src="tech.imgSrc" :alt="tech.name" >
                    </div>
                    <div class="description-overlay">
                        <b>{{ tech.name }}</b>
                        <span v-html="tech.text"></span>
                    </div>
                </div>
            </transition-group>
            <persistent-dialogue :script="script"></persistent-dialogue>
        </div>
    </div>
</template>

<script>
//import shuffle from './lodash/shuffle'
import shuffle from 'lodash/shuffle'
import persistentDialogue from './DialoguePersistent.vue'
import {CHANGE_HAIR_COLOR, CHANGE_TIE_COLOR} from '../store.js'
export default {
    name:'technology-section',
    data () {
        return {
            technologies: this.$store.state.technologies,
            script:[
                {speaker:'robot', lines:["But sire! You know more than that!!"]},
                {speaker:'man', lines:[
                    "Well.. yes. I know jQuery,  GWT, and a bunch of other stuff.",
                    "The thing is, web developers inevitably end up with a massive figurative toolbox.",
                    "It's not feasible to list every single item, nor would it be appropriate.",
                    `As it is, I choose to list the tools I most enjoy using, in the hopes that I can find a job I love, 
                    instead of a job that I can do.`,
                    'Thanks for your concern though, ABR. I appreciate it.'
                    ]},
                {speaker:'robot', lines:["Y-yes SIRE!"]},
                {speaker:'man', lines:["How's my project gallery coming along?"]},
                {speaker:'robot', lines:["All done"]},
                {speaker:'man', lines:["Excellent. Onwards! Err, I mean downwards!"]},
                {speaker:'robot', lines:["Haha. Jolly good sire"]},
            ],
        }
    },
    computed:{
        timeSincejQuery(){
            var milliseconds = new Date() - new Date('3-1-2017'.replace(/-/g, "/"));
            var days = Math.round(milliseconds / (1000*60*60*24));
            return days;
        }
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
        changeHairColor(){
            this.$store.commit(CHANGE_HAIR_COLOR)
        },
        changeTieColor(){
            this.$store.commit(CHANGE_TIE_COLOR)
        }
    },
    components:{
        'persistent-dialogue':persistentDialogue,
    }
}

</script>


<style lang="less" scoped>

@import '/assets/custom.less';

@tech-size: 125px;
@small-tech-size: 85px;

.guess{
    position: relative;
    display:flex;
    justify-content: space-between;
}

.interactions{
    text-align:right;
    span{
        cursor: pointer;
    }
    span:last-child{
        cursor: default;
    }
}

.technology-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 0.8rem;
    color: #333;
    .technology{
        position: relative;
        overflow: hidden;
        align-self: stretch;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        transition: box-shadow 0.75s, transform 1s;
        border-radius: 50%;
        max-width: @small-tech-size;
        max-height: @small-tech-size;
        padding: 5px;
        margin: 5px;
        &.reveal div.description-overlay{
            opacity: 1;
        }
        &.reveal img{
            filter: blur(3px);
        }   
    }
}

@media (min-width: 400px){
    .technology-list {
        font-size: 0.85rem;
        .technology{
            max-width: @tech-size;
            max-height: @tech-size;
        }
    }
}
div.description-overlay{
    position: absolute;
    opacity: 0;
    height:100%;
    width:100%;
    background-color:rgba(255,255,255,0.75);
    transition: 0.75s;
    padding: 5px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.img-wrapper{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
}
img{
    max-width: 100%;
    width: 100%;
    border-radius: 50%;
    height:auto;
    transition: 0.75s;
    will-change: filter;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
