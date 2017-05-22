<template>
    <div id="technologies" class="app-section">
        <div class="container">
            <div class="app-section-title scrollfire-to-right">The Workshop</div>
            <div class="tech-intro flow-text scrollfire-to-top">
                <p v-for="text in intro" v-html="text"></p>
            </div>
            <div class="interactions scrollfire-to-top">
                <span :class="activeCategory == i ? 'active':''" 
                    class="tech-filter" @click="onFilter(i)" 
                    v-for="(category,i) in categories" 
                    >{{category}}</span>
                <span class="line">|</span>
                <span @click="onShuffle">Shuffle</span>
                <span @mouseover="onReveal" @mouseout="onHide">Reveal</span>
            </div>
            <div class="scrollfire-to-top">
                <transition-group ref="wrapper" tag="div" name="tech" class="technology-list flow-text scrollfire-to-top">
                    <div v-for="tech in filteredTech" :key="tech.name" class="technology z-depth-2"  :class="tech.class" 
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
            </div>
            <persistent-dialogue :script="script"></persistent-dialogue>
            
        </div>
    </div>
</template>

<script>
//import shuffle from './lodash/shuffle'
import shuffle from 'lodash/shuffle'
import persistentDialogue from './DialoguePersistent.vue'
export default {
    name:'technologies',
    data () {
        return {
            gradientIndex: 1,
            technologies: this.$store.state.technologies,
            categories: this.$store.state.technologyCategories,
            activeCategory: 0,
            intro:[
                `I pride myself on being a versatile and competent programmer. Being proficient in Javascript, Java, and SQL means that
                    I can contribute to the 3 major pillars of web development: <b>frontend</b>, <b>backend</b>, and the <b>database</b>.`,
                `As the state of web development trends more towards complex frontends, 
                    so has my focus increased on staying up to date on modern frontend practices.`,
                `Can you guess the technology by the logo?`
            ],
            script:[
                {speaker:'robot', lines:["But sire! You know more than that!!"]},
                {speaker:'man', lines:[
                    "Well.. yes. I know jQuery,  GWT, and a bunch of other stuff.",
                    "The thing is, web developers inevitably end up with a massive figurative toolbox.",
                    "It's not feasible to list every single item, nor would it be appropriate.",
                    'So I choose to list only the technologies I enjoy using',
                    'Thanks for your concern though, Egg. I appreciate it.'
                    ]},
                {speaker:'robot', lines:["Y-yes SIRE!"]},
                {speaker:'man', lines:["Is the gallery ready?"]},
                {speaker:'robot', lines:["indubitably"]},
                {speaker:'man', lines:["Excellent. Onwards! Err, I mean downwards!"]},
                {speaker:'robot', lines:["Haha. Jolly good sire"]},
            ],
        }
    },
    computed:{
        filteredTech(){
            if(this.activeCategory == 0)
                return this.technologies
            else
                return this.technologies.filter(d=>d.category.includes(this.activeCategory))
        },
        timeSincejQuery(){
            var milliseconds = new Date() - new Date('3-1-2017'.replace(/-/g, "/"));
            var days = Math.round(milliseconds / (1000*60*60*24));
            return days;
        }
    },
    watch:{
        filteredTech(){
            this.animateContainerHeight();
        }
    },
    methods:{
        onFilter(index){
            this.activeCategory = parseInt(index);
        },
        onReveal(){
            this.technologies.forEach(d=>d.class = 'reveal')
        },
        onHide(){
            this.technologies.forEach(d=>d.class = '')
        },
        onShuffle(){
            this.technologies = shuffle(this.technologies)
        },
        animateContainerHeight(){
            let el = this.$refs.wrapper.$el
            let beforeHeight = el.clientHeight
            this.$nextTick(()=>{
                let afterHeight = el.clientHeight
                el.style.height = beforeHeight+'px'
                el.offsetHeight
                el.style.height = afterHeight+'px'
                setTimeout(()=>el.style.height = 'auto',1000)
            })
        }
    },
    components:{
        'persistent-dialogue':persistentDialogue,
    }
}

</script>


<style lang="less" scoped>

@import (reference) '/public/less/custom.less';

@tech-size: 125px;
@small-tech-size: 85px;

.guess{
    position: relative;
    display:flex;
    justify-content: space-between;
}

.interactions{
    padding:15px 0px;
    text-align: center;
    span{
        margin:0px 0.25em;
        padding:0px 0.25em;
        cursor: pointer;
    }
    span:last-child, span.line{
        cursor: default;
    }
    .tech-filter{
        transition: 1s;
        border-radius:4px;
        &.active{
            background: @offwhite;
            color:#333;
        }
    }
}

.technology-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    font-size: 0.8rem;
    color: #333;
    transition: height 1s;// to animate height change due to filtering content
}

.technology{
    transition: 1s;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 50%;
    width: @small-tech-size;
    height: @small-tech-size;
    padding: 5px;
    margin: 5px;
    &.reveal div.description-overlay{
        opacity: 1;
    }
    &.reveal img{
        filter: blur(3px);
    }   
}
@media (min-width: 400px){
    .technology-list {
        font-size: 0.85rem;
        .technology{
            width: @tech-size;
            height: @tech-size;
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
    display: flex;
    justify-content: center;
    align-items: center;
}
img{
    max-width:100%;
    max-height:100%;
    transition: 0.75s;
    will-change: filter;
}

.tech-leave-active{
    transition: all 1s, opacity .5s;
    position: absolute;
}

.tech-enter, .tech-leave-to{
    opacity: 0;
}

.tech-enter{
    transform: translateY(30px);
}


</style>
