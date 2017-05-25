<template>
    <div id="guestbook" class="app-section" >
        <div class="container">
            <div class="app-section-title scrollfire-to-right">Guestbook</div> 
            
            <persistent-dialogue :script="script"></persistent-dialogue>

            <book-form></book-form>
        </div>
    </div>
</template>

<script>
import {GET_COMMENTS} from '../../store.js'
import persistentDialogue from '../DialoguePersistent.vue'
import form from './Form.vue';
export default {
    name:'guestbook',
    data(){
        return {
            gradientIndex: 3,
            script:[
                {speaker:'man', lines:["I hope you enjoyed this visit. Please feel free to sign the guestbook."]},
                {speaker:'robot', lines:["Bye-bye! Don't forget about egg!"]},
            ],
        }
    },
    computed:{
        guestbook(){
            return this.$store.state.guestbook;
        }
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


</style>