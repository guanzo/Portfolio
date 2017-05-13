import {CHANGE_BACKGROUND} from './store.js'

export default {
    methods:{
        waypoint({y},direction){

            var el = this.$el;
            var gradientIndex = this.gradientIndex

            if(direction === 'out' && y === 'down'){
                gradientIndex++
                
            }else if(direction === 'out' && y === 'up')
                gradientIndex--
            
            this.$store.commit(CHANGE_BACKGROUND, { gradientIndex })
        },
    }
}