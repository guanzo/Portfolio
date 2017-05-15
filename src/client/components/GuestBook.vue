<template>
    <div id="guestbook" class="app-section" >
        <div class="container">
            <div class="app-section-title scrollfire-to-right">Guestbook</div> 
            <sup class="under-construction">under construction</sup>
            
            <persistent-dialogue :script="script"></persistent-dialogue>
        </div>
    </div>
</template>

<script>

import persistentDialogue from './DialoguePersistent.vue'

export default {
    name:'guestbook',
    data(){
        return {
            gradientIndex: 3,
            script:[
                {speaker:'man', lines:["I hope you found this visit enjoyable. I encourage you to sign the guestbook."]},
                {speaker:'robot', lines:["Bye-bye! Don't forget about egg!"]},
            ],
        }
    },
    components:{
        'persistent-dialogue':persistentDialogue,
    }
}
</script>

<style lang="less" scoped>

#guestbook{
    color: #333;
}

</style>