<template>
    <div id="technologies">
        <div class="app-section container">
            <h3>Technologies</h3>
            <div class="tech-intro flow-text scrollfire">
                <p>I pride myself on being a versatile and competent programmer. Being proficient in Javascript, Java, and SQL means that
                    I can contribute to the 3 major pillars of web development: frontend, backend, and the database.
                </p>
                <p>As the state of web development offloads more and more work onto the client, so has my focus increased on staying up to date on modern frontend practices. 
                </p>
                <p>The technologies listed below are not representative of all that I know, just the ones I enjoy using. 
                </p>
                <p>
                    Can you guess what they are by the logo?
                </p>
            </div>
            <div class="interactions">
                <span @click="onShuffle">Shuffle</span> |
                <span @mouseover="onReveal" @mouseout="onHide">Reveal</span>
            </div>
            
            <transition-group tag="div" class="technology-list flow-text scrollfire">
                <div class="technology z-depth-1" v-for="tech in technologies" :key="tech.name" :class="tech.class" 
                            @mouseover="tech.class = 'reveal'" @mouseout="tech.class = ''" >
                    <div class="img-wrapper">
                        <img :style="tech.style" :src="tech.imgSrc" :alt="tech.name" >
                    </div>
                    <div class="description-overlay">
                        <b>{{ tech.name }}</b>
                        <span v-html="tech.text"></span>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
//import shuffle from './lodash/shuffle'
import shuffle from 'lodash/shuffle'
export default {
    name:'technology-section',
    data () {
        return {
            technologies: this.$store.state.technologies
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
        }
    },
}

</script>


<style lang="less" scoped>

@import '/assets/custom.less';

@tech-size: 125px;
@small-tech-size: 85px;

#technologies{
    background: @linen;
    color: #333;
    //padding-bottom: 5rem;
}


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
    //border: 5px solid @charcoal;
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
