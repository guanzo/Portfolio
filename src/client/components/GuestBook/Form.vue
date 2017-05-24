<template>
    <form v-on:submit.prevent class="guestbook-form">
        <div class="input-field">
            <input v-model="name" id="name" type="text" autocomplete="off" class="validate" required>
            <label class="active" data-error="You got a name?" for="name">Name</label>
        </div>

        <div class="private-inputs" :class="privateClass">
            <div class="input-field">
                <input id="email" type="email" class="validate" autocomplete="off" :required="isPrivate">
                <label for="email" data-error="Invalid email">Email</label>
            </div>
            <div class="input-field">
                <input id="subject" type="text">
                <label for="subject">Subject</label>
            </div>
        </div>

        <div class="input-field">
            <textarea v-model="comment" maxlength="500" id="comment" class="materialize-textarea validate" required></textarea>
            <label for="comment" data-error="What do you have to say?">Comment</label>
        </div>
        <div class="submit-row">
            <div>
                <div>
                    <input v-model="visibility" value="public" class="with-gap" name="visibility" type="radio" id="public"/>
                    <label for="public">Sign Guestbook</label>
                </div>
                <div>
                    <input v-model="visibility" value="private" class="with-gap" name="visibility" type="radio" id="private" />
                    <label for="private">Contact Me</label>
                </div>
            </div>
            <div>
                <button @click="onSubmit" type="submit" class="waves-effect waves-dark btn" disabled>Submit</button>
            </div>
        </div>
    </form>
</template>

<script>

import {POST_COMMENT} from '../../store.js'

export default{
    name:'form',
    data(){
        return {
            visibility: 'public',
            name:'',
            email:'',
            subject:'',
            comment:'',
        }
    },
    computed:{
        isPrivate(){
            return this.visibility === 'private'
        },
        privateClass(){
            return this.isPrivate ? 'visible' : '';
        }
    },
    methods:{
        onSubmit(e){
            this.$store.dispatch({
                type: POST_COMMENT,
                data:{
                    visibility: this.visibility,
                    name: this.name,
                    email: this.email,
                    subject: this.subject,
                    comment: this.comment
                }
            })
        }
    }
}

</script>

<style lang="less" scoped>

@import '/public/less/custom.less';

.guestbook-form{
    margin: 3em 0em;
    padding: .5em 1em;
    background: rgba(0,0,0,0.1);
}

.submit-row{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    > div{
        margin: 0em 1em;
    }
}

button[type="submit"]{
    background: #FAD097;
    color: #333;
}

label{
    color: #333;
}

.input-field{
    margin-top: 1.5em;
}

/* label color */
.input-field label {
    color: #333;
}
/* label focus color */
.input-field input:focus + label,
.input-field textarea.materialize-textarea:focus + label  {
    color: #333;
}
/* label underline focus color */
.input-field input:focus,
textarea.materialize-textarea:focus{
    border-bottom: 1px solid #333;
    box-shadow: 0 1px 0 0 #333;
}

.private-inputs{
    max-height: 0;
    overflow: hidden;
    transition: 1s;
    opacity: 0;
    &.visible {
        max-height: 200px;
        opacity: 1;
    }
}
</style>