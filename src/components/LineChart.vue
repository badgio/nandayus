<script>
    import { Line, mixins } from 'vue-chartjs';

    export default {
        name: 'LineChart',
        extends: Line,
        mixins: [mixins.reactiveProp],
        props: {
            options: {
                type: Object,
                default: null
            }
        },
        mounted() {
            this.renderChart(this.chartData, this.options)
        },
        methods: {
            updateData() {
                this.renderChart(this.chartData, this.options)
            }
        }
    }
</script>