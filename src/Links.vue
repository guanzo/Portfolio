<template>
  <div class="text-left section">
    <h4 class="section-title">Links</h4>
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
                    href:'https://www.linkedin.com/in/eric-guan-6a050547?trk=nav_responsive_tab_profile_pic',
                    imgSrc:'assets/images/linkedin.png'
                },
                {
                    name:'Stack Overflow',
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
}

.chip{
    border-radius: 16px;
    display: flex;
    margin-right: 10px;
    padding: 2px 5px 2px 0px;
    overflow: hidden;
    background-color: #e4e4e4;
    text-decoration: none;
    img{
        max-height:25px;
        width:auto;
        border-radius: 16px;
        margin-right:4px;
    }
    span{
        text-decoration: none;
    }
}

</style>
