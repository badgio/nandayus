<script>
    import { Line, mixins } from 'vue-chartjs';

    export default {
        /*
            Global Awareness:
                1. name
        */
        name: 'LineChart',
        /*
            Template Modifiers:
                1. delimiters
        */
        /*
            Template Dependencies:
                1. components
                2. directives
        */
        /*
            Composition:
                1. extends
                2. mixin
                3. provide / inject
        */
        extends: Line,
        mixins: [mixins.reactiveProp],
        /*
            Interface:
                1. inheritAttrs
                2. props
                3. emits
        */
        props: {
            options: {
                type: Object,
                default: null
            }
        },
        /*
            Composition API:
                1. setup
        */
        /*
            Local State
                1. data
                2. computed
        */
        /*
            Events:
                1. watch
            
            &

            Lifecycle Events ( by the order in which they are called ):
                1. beforeCreate
                2. created
                3. beforeMount
                4. mounted
                5. beforeUpdate
                6. updated
                7. activated
                8. deactivated
                9. beforeUnmount
                10. unmounted
                11. errorCaptured
                12. renderTracked
                13. renderTriggered
        */
        mounted() {
            this.renderChart(this.chartData, this.options)
        },
        /*
        Reactive Properties:
            1. methods
        */ 
        methods: {
            updateData() {
                this.renderChart(this.chartData, this.options)
            }
        }
        /*
            Rendering:
                1. template / render
        */
    }
</script>