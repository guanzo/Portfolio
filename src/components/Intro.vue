<template>
<div class="text-center">
    <div>
        <transition name="first" appear>
            <h2 class="welcome">Welcome</h2>
        </transition>
        <transition name="hand">
            <i v-show="showHand" :class="icons[iconIndex]" class="fa fa-3x" aria-hidden="true"></i>
        </transition>
    </div>
    <transition name="second" appear>
        <h2>my name is Eric Guan</h2>
    </transition>
    <transition name="third" appear>
        <div>
            <p>I'm a full stack web developer who loves creating dynamic web applications.
            <br>You can find me fiddling with data visualizations, experimenting with new web technologies, or just listening to my tunes.</p>
        </div>
    </transition>
</div>
</template>

<script>
export default {
    data () {
        return {
            showHand: false,
            icons:['fa-hand-peace-o','fa-hand-spock-o','fa-hand-paper-o'],
            iconIndex: Math.floor(Math.random() * 3) + 0  
        }
    },
    mounted(){
        setTimeout(()=>{
            this.showHand = true

            setTimeout(()=>this.showHand = false, 1000)

        }, 1000)
    }
}
</script>

<style scoped lang="less">

.welcome{
    display: inline;
}

.first-enter-active, .second-enter-active, .third-enter-active{
    transition: 2.5s;
}

.first-enter, .second-enter, .third-enter, .hand-enter{
    opacity: 0;
}

.second-enter-active{
    transition-delay: 3.5s;
}

.third-enter-active{
    transition-delay: 4.5s;
}


.fa{
    position: absolute;
}

.hand-enter-active,{
    transition: opacity 1.25s ease-out;
}

.hand-leave-active{
    transition: opacity 2s cubic-bezier(0.950, 0.050, 0.795, 0.035), transform 1.5s cubic-bezier(0.660, -0.290, 0.000, 1.180);
    transform-origin: bottom;
}

.hand-leave-to{
    opacity: 0;
    transform: translate(15px, -5px) rotate(40deg);
}

</style>
