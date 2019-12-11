import { Line, mixins } from 'vue-chartjs'

export default {
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: ['chartData', 'options'],
    mounted () {
        console.log(mixins.reactiveProp);
        this.renderChart(this.chartData, this.options)
    }
}
