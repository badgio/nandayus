<script>
  import { Bubble } from 'vue-chartjs'
  export default {
    extends: Bubble,
    data () {
      return {
        datacollection: {
          labels: ['Data'],
          datasets: [
            {
              label: 'Nº visitantes',
              backgroundColor: '#f87979',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              data: [
                {
                  x: 'Monday',
                  y: '21h',
                  r: 10
                },
                {
                  x: 'Tuesday',
                  y: '21h',
                  r: 20
                },
                {
                  x: 'Wednesday',
                  y: '12h',
                  r: 25
                },
                {
                  x: 'Thursday',
                  y: '19h',
                  r: 50
                },
                {
                  x: 'Friday',
                  y: '20h',
                  r: 25
                },
                {
                  x: 'Saturday',
                  y: '23h',
                  r: 5
                }
              ]
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{ 
                type: 'category', 
                labels: [ '00h','23h','22h','21h','20h','19h','18h','17h','16h','15h','14h','13h','12h','11h','10h','9h','8h']
            }],
            xAxes: [{ 
                type: 'category', 
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday']
            }],
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.renderChart(this.datacollection, this.options)
    }
  }
</script>