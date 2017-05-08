<template>
    <div class="dialogue flow-text">
        <div v-for="obj in script" :class="getSpeakerClass(obj.speaker)" 
            class="dialogue-section scrollfire-to-top">
            <component :is="obj.speaker" />
            <div class="lines">
                <template v-for="line in obj.lines">
                    <p class="speech-bubble">{{ line }}</p>
                    <br>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
//any time man talks, robot talks or both.
export default {
    name:'dialogue',
    props:['script'],
    methods:{
        getSpeakerClass(speaker){
            if(speaker === 'robot')
                return 'robot-text';
            else
                return 'man-text'
        }
    }
}
</script>

<style lang="less">

@speech-bg: rgba(255,255,255,0.2);

.robot-text{
    text-transform: uppercase;
}

.speech-bubble{
    box-shadow: 0.2em 0 0 @speech-bg, -0.2em 0 0 @speech-bg;
    background-color: @speech-bg;
    border-radius: 5px;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
}

.dialogue-section {
    display: flex;
    align-items: flex-start;
    margin: 1em 0;
    p{
        display: inline-block;
        margin: 0.5em 0;
        box-shadow: 0.2em 0 0 @speech-bg, -0.2em 0 0 @speech-bg;
        background-color: @speech-bg;
        border-radius: 5px;
        &:first-child{
            margin-top: 1em;
        }
    }   
    img{
        max-width: 50px;
        height: auto;
        margin-top: 0.65em;
        margin-right: 1em;
    }
}

</style>