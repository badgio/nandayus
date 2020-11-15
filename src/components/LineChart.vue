<script>
    import { Line } from 'vue-chartjs';

    export default {
        name: 'LineChart',
        extends: Line,
        props: {
            chartdata: {
                type: Object,
                default: null,
            },
            options: {
                type: Object,
                default: null
            }
        },
        mounted() {
            console.log('Mounted!')
            this.renderChart(this.chartdata, this.options)
        },
        watch: {
            chartdata() {
                console.log('Watch: chartData!')
                this.$data._chart.update()
            }
        }
    }
</script>