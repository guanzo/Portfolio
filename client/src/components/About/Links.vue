<template>
    <div class="links scrollfire-appear">
        <div v-for="link in links" :key="link.url" class="link-container">
            <a :href="link.url" target="_blank" >
                <i class="icon" :class="link.iconClass"></i>
            </a>
            <div class="link-name flow-text">{{ link.name }}</div>
        </div>
    </div>
</template>

<script>

export default {
    name:'links',
    data(){
        return {
            links: [
                {
                    name: 'Resume',
                    url:'https://docs.google.com/document/d/14A90xrr3Hk7tba72hpbMB-1UKpjvQ514DjXepeN_quo/edit?usp=sharing',
                    iconClass:'icon-doc-text'
                },
                {
                    name: 'Github',
                    url:'https://github.com/guanzo',
                    iconClass:'icon-github-circled'
                },
                {
                    name: 'LinkedIn',
                    url:'https://www.linkedin.com/in/eric-guan-6a050547',
                    iconClass:'icon-linkedin',
                },
                {
                    name: 'Stack Overflow',
                    url:'http://stackoverflow.com/users/2498782/eric-guan',
                    iconClass:'icon-stackoverflow'
                }
            ],
        }
    },
}

</script>

<style lang="scss" scoped>

.links{
    padding:5vh 0;
    @media (min-width: 400px) {
        padding:10vh 0;
    }
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.link-container{
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    text-align: center;
    a{
        color: white;
        margin-bottom: 15px;
        &:hover {
            .icon{
                text-shadow: 0px 0px 2px $offwhite;
                &:before{
                    transform: scale(1.05);
                }
            }
            & + .link-name {
                opacity: 1;
            }
        }
        .icon{
            font-size: 5em;
        }
    }
    .icon:before, .link-name {
        transition: 0.5s;
    }
    .link-name {
        opacity: 0;
    }
}




</style>