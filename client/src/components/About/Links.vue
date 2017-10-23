<template>
    <div class="links scrollfire-appear">
        <div v-for="link in links" :key="link.url" class="link-container">
            <a :href="link.url" target="_blank" >
                <i class="fa fa-3x" :class="link.iconClass"></i>
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
                    iconClass:'fa-file-text-o'
                },
                {
                    name: 'Github',
                    url:'https://github.com/guanzo',
                    iconClass:'fa-github'
                },
                {
                    name: 'LinkedIn',
                    url:'https://www.linkedin.com/in/eric-guan-6a050547',
                    iconClass:'fa-linkedin',
                },
                {
                    name: 'Stack Overflow',
                    url:'http://stackoverflow.com/users/2498782/eric-guan',
                    iconClass:'fa-stack-overflow'
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
            .fa{
                text-shadow: 0px 0px 5px $offwhite, -5px 5px 5px #333;
                transform: scale(1.25);
            }
            & + .link-name {
                opacity: 1;
            }
        }
        .fa{
            font-size: 5em;
        }
    }
    .fa, .link-name {
        transition: 0.5s;
    }
    .link-name {
        opacity: 0;
    }
}




</style>