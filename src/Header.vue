<template>
    <header>
        
    </header>
</template>

<script>
import Vue from 'vue'

export default {
	data () {
		return {
			isLight: true,
		}
	},
    mounted(){
        Vue.nextTick(()=>{
            this.showActive();
        })
    },
    methods:{
        lightTheme(){
            if(this.isLight)
                return;
            this.isLight = true;
            document.body.className = "light-theme"
            this.showActive();
        },
        darkTheme(){
            if(!this.isLight)
                return;
            this.isLight = false;
            document.body.className = "dark-theme"
            this.showActive();

        },
        showActive(){
            var containerWidth = this.$refs.themeContainer.clientWidth; 
            var activeNode = this.isLight ? this.$refs.light : this.$refs.dark;
            
            var left = activeNode.offsetLeft
            var right = containerWidth - (left + activeNode.clientWidth)

            var indicator = this.$refs.indicator;
            if(indicator.offsetLeft < left){//slide right
                indicator.style.right = right +'px';
                setTimeout(()=>indicator.style.left = left +'px', 100)
            }else{//slide left
                indicator.style.left = left +'px';
                setTimeout(()=>indicator.style.right = right +'px', 100)
            }
        },
    }
}
</script>

<style lang="less">
/*
#455a64 blue-grey darken-2
#37474f blue-grey darken-3
#263238 blue-grey darken-4
*/
body{
    transition: background-color 10s ease-out, color 10s ease-out;
    will-change: background-color;
}
body.light-theme{
    background: #fafafa;
	color: #2c3e50;
}

body.dark-theme{
    background: #262626;
    color: white;

    .z-depth-1{
        box-shadow: 0 2px 2px 0 white, 0 1px 5px 0 white, 0 3px 1px -2px white;
    }
}

</style>

<style scoped lang="less">

header{
    height:30px;
    margin-bottom:40px;
}

.toggle-theme{
    position: relative;
    float: right;
    padding:2px 5px;
    span{
        display: inline-block;
        cursor: pointer;
    }
    .indicator{
        position: absolute;
        bottom:0;
        transition: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        height:2px;
        background: #333;
        left:0;
        right:100%;
    }
}

</style>
