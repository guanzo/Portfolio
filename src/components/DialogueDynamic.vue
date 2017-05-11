<template>
    <transition name="portrait">
        <div v-if="index >= 0" class="dialogue flow-text">
            <div class="man-text dialogue-section">
                <man />
                <div class="lines">
                    <transition name="speech" appear>
                        <p class="speech-bubble" :key="currentManLine">{{ currentManLine }}</p>
                    </transition>
                </div>
            </div>
            <div class="robot-text dialogue-section">
                <robot />
                <div class="lines">
                    <transition name="speech" appear>
                        <p class="speech-bubble" :key="currentRobotLine">{{ currentRobotLine }}</p>
                    </transition>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
/*any time man talks, robot talks or both.
2 portraits are persistent, new speech text replaces old speech text

BASIC RULES:
-Always has man and robot
-Parent component controls when conversation starts, mainly by a scrollfire/waypoint
-script is array of 
    -object with speaker, their line, and an optional duration
        (which gets converted into a promise with default duration)
    -a function that returns a promise

-Then call promises sequentially, synchronously
*/
import isFunction from 'lodash/isFunction'
import Promise from 'bluebird'

export default {
    name:'dynamic-dialogue',
    props:['script','startDialogue'],
    data(){
        return {
            index: -1,
            duration: 2000
        }
    },
    computed:{
        currentObj(){
            return this.script[this.index]
        },
        currentManLine(){
            if(this.currentObj.speaker === 'man')
                return this.currentObj.line
            else
                return ''
        },
        currentRobotLine(){
            if(this.currentObj.speaker === 'robot')
                return this.currentObj.line
            else
                return ''
        }
    },
    watch:{
        startDialogue(){
            this.initiate();
        }
    },
    methods:{
        initiate(){
            Promise.each(this.script,(obj)=>{
                if(isFunction(obj))
                    return obj().then(this.nextLine)
                else
                    return this.createPromise(obj,obj.duration)
            });
        },
        createPromise(obj, ms = this.duration){
            return new Promise((resolve,reject)=>{
                this.nextLine()
                setTimeout(resolve, ms)
            })
        },
        nextLine(){
            this.index++;
        }
    },
}
</script>

<style lang="less" scoped>


@import '/assets/custom.less';


.dialogue-section {
    display: flex;
    align-items: center;
    min-height: 50px;
    padding: 1em 0;
    p{
        display: inline-block;
        margin: 0;
        box-shadow: 0.2em 0 0 @speech-bg, -0.2em 0 0 @speech-bg;
        background-color: @speech-bg;
        border-radius: 5px;
    }   
    .speech-portrait{
        //for w/e reason i need all 3 widths
        width:50px;
        max-width: 50px;
        min-width: 50px;
        height: auto;
        margin-right: 1em;
    }
}


.speech-enter-active, 
.speech-leave-active, 
.portrait-enter-active{
    transition: 0.75s;
}
.speech-leave-active{
    position: absolute;
}

.speech-enter{
    opacity: 0;
    transform: translateY(20px);
}

.speech-leave-to{
    opacity: 0;
    transform: translateY(-20px);
}

.portrait-enter{
    opacity:0;
}


</style>