<template>
    <div class="project-section" :style="theme">
        <div class="container section">
            <h5 class="scrollfire">{{ project.name }}</h5>
        </div>
    </div>
</template>

<script>

export default {
    name:'project',
    props:['project'],
    data(){
        return {
            theme:{
                background: this.project.background,
                color: this.project.color,
            }
        }
    }
}

</script>

<style lang="less" scoped>

.project-section{
    min-height: 50vh;
}

.scrollfire{
    opacity: 0;
    transform: translateX(-50%);
}

</style>