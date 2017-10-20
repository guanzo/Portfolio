<template>
    <div class="links scrollfire-appear">
        <a :href="link.url" v-for="link in links" target="_blank" :key="link.url">
            <i class="fa fa-3x" :class="link.iconClass"></i>
        </a>
    </div>
</template>

<script>

export default {
    name:'links',
    data(){
        return {
            links: this.$store.state.links
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

.link{
    flex: 1;
    max-width: 100px;
    height:auto;

    svg{
        width:100%;
        height:100%;
    }
}

a{
    color: white;
}


.fa{
    transition: 0.5s;
    font-size: 2em;
    
    @media (min-width: 550px) {
        font-size: 5em;
    }
    &:hover{
        text-shadow: 0px 0px 5px $offwhite, -5px 5px 5px #333;
        transform: scale(1.5);
    }
}


</style>