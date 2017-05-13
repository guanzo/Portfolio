<template>
    <div id="guestbook" class="app-section" >
        <v-waypoint :position="'fill'" @waypoint="waypoint"></v-waypoint>
        <div class="container">
            <h2 class="app-section-title scrollfire-to-right">Guestbook</h2>
            
        </div>
    </div>
</template>

<script>

import waypoint from '../waypoint.js'
export default {
    name:'guestbook',
    mixins:[waypoint],
    data(){
        return {
            gradientIndex: 3,
        }
    }
}
</script>

<style lang="less" scoped>

#guestbook{
    color: #333;
}

</style>