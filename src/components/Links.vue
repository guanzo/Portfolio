<template>
  <div class="section">
    <h3 class="section-title">Links</h3>
    <div class="link-container">
        <a v-for="link in links" :href="link.href" class="chip" target="_blank">
            <img :src="link.imgSrc">
            <span>{{ link.name }}</span>
        </a>
    </div>
  </div>
</template>

<script>

export default {
	name: 'app',
	data () {
		return {
			links: [
                {
                    name:'GitHub',
                    href:'https://github.com/guanzo',
                    imgSrc:'assets/images/github.gif'
                },
                {
                    name:'LinkedIn',
                    href:'https://www.linkedin.com/in/eric-guan-6a050547',
                    imgSrc:'assets/images/linkedin.png'
                },
                {
                    name:'StackOverflow',
                    href:'http://stackoverflow.com/users/2498782/eric-guan',
                    imgSrc:'assets/images/so.png'
                },
            ]
		}
	},
}
</script>

<style lang="less">

.link-container{
    display: flex;
    flex-wrap: wrap;
}

.chip{
    border-radius: 16px;
    display: flex;
    margin: 0px 10px 5px 0px;
    padding: 2px 5px 2px 0px;
    overflow: hidden;
    background-color: #e4e4e4;
    text-decoration: none;
    white-space: nowrap;
    img{
        max-height:25px;
        width:auto;
        border-radius: 16px;
        margin-right: 4px;
        margin-left: 2px;
    }
    span{
        text-decoration: none;
    }
}

</style>
