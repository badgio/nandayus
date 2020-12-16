<script>
  import { Bar } from 'vue-chartjs'

  export default {
    /*
        Global Awareness:
            1. name
    */
    name: 'barchart',
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
    extends: Bar,
    /*
        Interface:
            1. inheritAttrs
            2. props
            3. emits
    */
    /*
        Composition API:
            1. setup
    */
    /*
        Local State
            1. data
            2. computed
    */
    data() {
      return {
        chartData: {
          labels: ["8h-9h", "9h-10h", "10h-11h", "11h-12h", "12h-13h", "13h-14h", "14h-15h", "15h-16h", "16h-17h",
            "17h-18h", "18h-19h", "19h-20h"
          ],
          datasets: [{
            label: 'Nº visitantes',
            borderWidth: 1,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            pointBorderColor: '#2554FF',
            data: [12, 19, 3, 5, 2, 3, 20, 3, 5, 6, 2, 1]
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [{
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
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
    }
    /*
        Reactive Properties:
            1. methods
    */
    /*
        Rendering:
            1. template / render
    */
  }
</script>