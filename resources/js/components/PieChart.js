import { Pie, mixins } from 'vue-chartjs'

export default {
    extends: Pie,
    mixins: [mixins.reactiveProp],
    props: ['chartData', 'options'],
    mounted () {
        //console.log(mixins.reactiveProp);
        this.renderChart(this.chartData, this.options)
    }
}
