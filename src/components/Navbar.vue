<template>
    <nav>
        <div class="container">
            <ul>
                <li><router-link to="home">Home</router-link></li>
                <li><router-link to="projects">Projects</router-link></li>
            </ul>
        </div>
    </nav>
</template>

<script>
import Vue from 'vue'

export default {
	data () {
		return {
		}
	},
}
</script>

<style lang="less">
</style>

<style lang="less" scoped>

@import '/assets/custom.less';

nav{
    background: @primary;
    background: linear-gradient(to right, @primary, #882D60);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
    height: 64px;
    line-height: 64px;
}

ul{
    padding-left: 0;
    margin: 0;
    list-style-type: none;
    
}

li{
    list-style-type: none;
    transition: background-color .3s;
    float: left;
    padding: 0;
}

a{
    transition: background-color .3s;
    color: white;
    font-size: 2rem;
    display: block;
    padding: 0 15px;
    cursor: pointer;
    text-decoration: none;
    &:hover, &.active{
        background-color: rgba(0,0,0,0.15);
    }
}


</style>
