<template>
    <div id="home" class="app-section section container center-align">
        <transition name="intro" appear>
            <div class="intro-text">
                <h3>Welcome</h3>
                <h3>my name is Eric Guan</h3>
                <div class="flow-text">
                    <p>I'm a full stack web developer who loves creating dynamic web applications.
                    <br>You can find me creating data visualizations, experimenting with new web technologies, or just listening to my tunes.</p>
                </div>
            </div>
        </transition>
        <transition-group name="links" tag="div" class="links" appear>
            <div v-for="link in links" :key="link.url" class="link">
                <a :href="link.url" target="_blank">
                    <div class="icon-wrapper z-depth-2">
                        <i class="fa fa-4x" :class="link.icon"></i>
                    </div>
                </a>
            </div>
        </transition-group>
    </div>
</template>

<script>
/*

    <transition name="hand">
        <i v-if="showHand" :class="icons[iconIndex]" class="fa fa-3x" aria-hidden="true"></i>
    </transition>
*/
export default {
    name:'intro-section',
    data () {
        return {
            showHand: false,
            icons:['fa-hand-peace-o','fa-hand-spock-o','fa-hand-paper-o'],
            iconIndex: Math.floor(Math.random() * 3) + 0,
            links: this.$store.state.links 
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

@import '/assets/custom.less';

.app-section{
    height: calc(~'100vh - 64px');
}

.links{
    margin: 1em 0;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

}

.link{
    padding: 5px;
    .icon-wrapper{
        position: relative;
        background: @primary, @purple;
        background: linear-gradient(to left, @primary, @purple);
        width:100px;
        height:100px;
        border-radius: 50%;
        &:before{
            transition: 0.5s;
            content: '';
            position: absolute;
            z-index: 1;
            background: white;
            width:100%;
            height:100%;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%) scale(0);
            border-radius: 50%;
        }
    }
    .fa{
        position: relative;
        z-index: 2;
        transition: 0.75s;
        line-height: 100px;
        color: white;
        &:before{
            backface-visibility: hidden;
        }
    }
    .grower{
        transform: scale(0.25);
    }
    &:hover{
        .icon-wrapper:before{
            transform: translateX(-50%) translateY(-50%) scale(.9);
        }
        .grower{
            color: white;
            //z-index: 5;
        }
        .fa{
            color: @primary;
            //transform: scale(1.15);
        }
    }
}

.hand-enter{
    opacity: 0;
}


.intro-enter-active, .links-enter-active{
    transition: 0.5s;
}

.links-enter-active{
    transition-delay: 0.65s;
}

.intro-enter, .links-enter{
    opacity: 0;
    transform: rotateX(45deg) translateY(100px) scale(0.75);
}

.hand-enter-active{
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
