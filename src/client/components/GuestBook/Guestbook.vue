<template>
    <div id="guestbook" class="app-section" >
        <div class="container">
            <div class="app-section-title scrollfire-to-right">Guestbook</div> 
            <sup class="under-construction">under construction. form is inactive.</sup>
            
            <persistent-dialogue :script="script"></persistent-dialogue>

            <book-form></book-form>

            <div class="book flow-text">
                <div v-for="guest in guestbook" class="page">
                    <div class="name">{{ guest.name }}</div>
                    <div class="comment">{{ guest.comment }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import persistentDialogue from '../DialoguePersistent.vue'
import form from './Form.vue';
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
    computed:{
        guestbook(){
            return this.$store.state.guestbook;
        }
    },
    mounted(){

    },
    components:{
        'persistent-dialogue':persistentDialogue,
        'book-form': form
    }
}
</script>

<style lang="less">

@import '/public/less/custom.less';

#guestbook{
    color: #333;
}

.container{
    overflow: hidden;
}

.page{
    margin-bottom: 2em;
    
    .name{
        font-weight: bold;
    }
    .comment{
    }
}

</style>