<template>
    <div>
        <h2>
            {{languageProp.pageTitle[this.selected_language]}} - {{this.page_name}}
        </h2>
        <h3>
            {{this.translate['Week_report'][this.selected_language]}} 
        </h3> 
        <div
            class="card_container"
            v-if="twoCards"
        >
            <div
                class="card2"
            >
                <br>
                <h3>
                    {{languageProp.totalVisitors[this.selected_language]}}
                </h3>   
                <h4>
                    {{this.total_visitors}}
                </h4>
                <br>
                <h3>
                    {{languageProp.customerProfile.text[this.selected_language]}}
                </h3>
                <h4>
                    {{this.most_common_age_range}} -
                    {{this.most_common_gender}} -   
                    {{this.most_common_country}}
                    
                </h4>
            </div>
            <div
                class="card2"
            >
                <br>
                <h3>
                    {{languageProp.nRedeemedRewards.text[this.selected_language]}}
                </h3>   
                <h4>
                    {{this.redeemed_rewards}}
                </h4>
                <br>
                <h3>
                    {{languageProp.busiestDay.text[this.selected_language]}}
                </h3>
                <h4>
                    {{this.busiest_day}} 
                </h4>
            </div>
            <div
                class="chart_container2"
            >
                <bar-chart
                    ref="barChart"
                    :chartData="chartData_week"
                    :options="options_week"
                />
                    
               
            </div>
            
        </div>
        <hr>
        <h3>
            {{languageProp.chart[this.selected_language]}}
        </h3>
        <div
            class="buttons_container2"
        >
            <label>
                {{languageProp.starting_date[this.selected_language]}}
                <input
                    type="date"
                    id="min_date"
                    name="min_date"
                    ref="min_date"
                    :value="min_date_value"
                    :min="this.chart.data.dates[0]"
                    :max="max_date_value"
                    v-on:change="updateChart"
                >
            </label>
            <label>
                 {{languageProp.finishing_date[this.selected_language]}}
                <input
                    type="date"
                    id="max_date"
                    name="max_date"
                    ref="max_date"
                    :value="max_date_value"
                    :min="min_date_value"
                    :max="this.chart.data.dates[this.chart.data.dates.length-1]"
                    v-on:change="updateChart"
                >
            </label>
        </div>
        <br>
        <div
            class="chart_container"
        >
            <LineChart
                ref="lineChart"
                :chartData="chartdata"
                :options="options"
            />
        </div>
        <br>
        <div
            class="buttons_container1"
        >
            <label for="general_checkbox">
                <input 
                    type="radio"
                    name="general_checkbox"
                    v-on:click="fillChartData(['General'], min_date_value, max_date_value)"
                    value="general"
                    v-model="chart.pickedCheckbox"
                >
                {{languageProp.general[this.selected_language]}}
            </label>
            <label for="age_checkbox">
                <input 
                    type="radio"
                    name="age_checkbox"
                    v-on:click="fillChartData(['Young','Adult','Elder'], min_date_value, max_date_value)"
                    value="age"
                    v-model="chart.pickedCheckbox"
                >
                {{languageProp.age[this.selected_language]}}
            </label>
            <label for="gender_checkbox">
                <input 
                    type="radio"
                    name="gender_checkbox"
                    v-on:click="fillChartData(['Male','Female','Other'], min_date_value, max_date_value)"
                    value="gender"
                    v-model="chart.pickedCheckbox"
                >
                {{languageProp.gender[this.selected_language]}}
            </label>
            <label for="nationality_checkbox">
                <input 
                    type="radio"
                    name="nationality_checkbox"
                    v-on:click="fillChartData(countries, min_date_value, max_date_value)"
                    value="nationality"
                    v-model="chart.pickedCheckbox"
                >
                {{languageProp.nationality[this.selected_language]}}
            </label>
        </div>
        <br>
        <hr>    
        <div
            class="chart_container"
        >
            <bar-chart
                    ref="barChart2"
                    :chartData="chartData2"
                    :options="options2"
            />
        </div>

        <div
                v-if="showTable"
            >
            <br>
            <hr>
            <h3>
                {{languageProp.table[this.selected_language]}}
            </h3>
                <table>
                    <tr>
                        <th>
                            {{languageProp.table.location_name[this.selected_language]}}
                        </th>
                        <th>
                            {{languageProp.table.n_of_visitors[this.selected_language]}}
                        </th>
                    </tr>
                    <tr
                        v-for="item in table_locations"
                        :key="item"
                    >
                        <td>
                            {{item}}
                        </td>
                        <td>
                            {{table_data[item]}}
                        </td>
                    </tr>
                </table>
            </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import firebase from "firebase";
    import store from '../store/index.js';
    import LineChart from './LineChart.vue';
    import BarChart from './BarChart.vue';
    export default {
        /*
            Global Awareness:
                1. name
        */
        name: 'Statistics',
        /*
            Template Modifiers:
                1. delimiters
        */
        /*
            Template Dependencies:
                1. components
                2. directives
        */
        components: {
            LineChart,
            BarChart,
        },
        /*
            Composition:
                1. extends
                2. mixin
                3. provide / inject
        */
        /*
            Interface:
                1. inheritAttrs
                2. props
                3. emits
        */
        props: {
            languageProp: {
                type: Object,
                required: true,
            },
            twoCards: {
                type: Boolean,
                required: true,
            },
            showTable: {
                type: Boolean,
                required: true,
            },
            getLink: {
                type: String,
                required: true,
            },
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
        data() {
            return {
                loaded: false,
                chart: {
                    pickedCheckbox: 'general',
                    data: {
                        dates: [],
                        general: [
                            {
                                data: [],
                            },
                        ],
                    },
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: '',
                                }
                            }
                        ],
                        xAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: '  '
                                }
                            }
                        ]
                    }
                },
                options_week: {
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
                },
                translate: {
                    Week_report: {
                        en: 'Week report',
                        pt: 'Relatório semanal'
                    },
                    Young: {
                        en: 'Young',
                        pt: 'Jovem'
                    },
                    Adult: {
                        en: 'Adult',
                        pt: 'Adulto'
                    },
                    Elder: {
                        en: 'Elder',
                        pt: 'Idoso'
                    },
                    Male: {
                        en: 'Male',
                        pt: 'Masculino'
                    },
                    Female: {
                        en: 'Female',
                        pt: 'Feminino'
                    },
                    General: {
                        en: 'General',
                        pt: 'Geral'
                    },
                    Monday: {
                        en: 'Monday',
                        pt: 'Segunda-feira'
                    },
                    Tuesday: {
                        en: 'Tuesday',
                        pt: 'Terça-feira'
                    },
                    Wednesday: {
                        en: 'Wednesday',
                        pt: 'Quarta-feira'
                    },
                    Thursday: {
                        en: 'Thursday',
                        pt: 'Quinta-feira'
                    },
                    Friday: {
                        en: 'Friday',
                        pt: 'Sexta-feira'
                    },
                    Saturday: {
                        en: 'Saturday',
                        pt: 'Sábado'
                    },
                    Sunday: {
                        en: 'Sunday',
                        pt: 'Domingo'
                    },
                    nvisitors: {
                        en: 'Nº of Visitors',
                        pt: 'Nº de Visitantes',
                    },
                    nRedeemedRewards: {
                        en: 'Nº of Redeemed Rewards',
                        pt: 'Nº de Recompensas Redimidas',
                    },
                    date: {
                        en: 'Date',
                        pt: 'Data',
                    },
                },
                cat_name: '',
                page_name: '',
                total_visitors: '',
                busiest_day: '',
                most_common_age_range: '',
                most_common_country: '',
                most_common_gender:'',
                redeemed_rewards: '',
                week_stats: {},
                second_chart_stats: {},
                chartData_week: {
                    labels: [],
                    datasets: [{
                        label: '',
                        borderWidth: 1,
                        backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255,99,132,1)',
                        ],
                        pointBorderColor: '#2554FF',
                        data: []
                    }]
                },
                min_date_value: '',
                max_date_value: '',
                dates:'',
                countries:[],
                general_data:[],
                table_data:[],   
                table_locations:[],
                table_values:[],
                chartData2: {
                    labels: ["0h-1h","1h-2h","2h-3h","3h-4h","4h-5h","5h-6h","6h-7h","7h-8h","8h-9h", "9h-10h", "10h-11h", "11h-12h", "12h-13h", "13h-14h", "14h-15h", "15h-16h", "16h-17h",
                        "17h-18h", "18h-19h", "19h-20h","20h-21h", "21h-22h", "22h-23h","23h-24h"
                    ],
                    datasets: [{
                        label: '',
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
                        'rgba(255, 159, 64, 0.2)',
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
                        'rgba(255, 159, 64, 0.2)',
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
                        'rgba(255, 159, 64, 1)',
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
                        data: []
                    }]
                    },
                    options2: {
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
        computed: {
            selected_language() {
                return this.$store.getters.getLanguage;
            },
            chartdata() {
                return {
                    labels: [],
                    datasets: [],
                }
            },
            chartdata_week() {
                return {
                    labels: [],
                    datasets: [],
                }
            },
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
        async created() {
            await this.getObjects();
                this.create_week_report();
                this.create_main_chart();
                this.create_second_chart();
                // update chart
                this.$refs.barChart.updateData();
                this.$refs.barChart2.updateData();
                this.$refs.lineChart.updateData();
  
        },
        /*
        Reactive Properties:
            1. methods
        */
        methods: {
            async getObjects() {
                var idToken = store.getters.getToken;
                await axios
                    .get(this.getLink + this.$route.params.uuid + '/statistics', {
                            headers: {
                                'Access-Control-Allow-Origin': '*', 
                                'Content-type': 'application/json',
                                authorization: 'Bearer ' + idToken
                            },
                        }
                    )
                    .then((res) => {
                            
                            //name
                            this.page_name = res.data[0];
                            console.log(res.data);

                            //Week Report
                            this.total_visitors= res.data[1]['Total_visitors'];
                            this.redeemed_rewards= res.data[1]['Redeemed_rewards'];
                            
                            if (this.total_visitors>0 || this.redeemed_rewards>0 ){ 
                                this.busiest_day= this.translate[res.data[1]['Busiest_day']][this.selected_language];
                                if (res.data[1]['Most_common_country']) this.most_common_country= res.data[1]['Most_common_country'];
                                if (res.data[1]['Most_common_age_range']) this.most_common_age_range= this.translate[res.data[1]['Most_common_age_range']][this.selected_language];                
                                if (res.data[1]['Most_common_gender']) this.most_common_gender= this.translate[res.data[1]['Most_common_gender']][this.selected_language];
                                this.week_stats=res.data[1];
                            }
                            //chart labels
                            var arrayOfStrings = this.getLink.split('/');
                            var type=arrayOfStrings[4];
                            if(type=='rewards'){
                                this.chartData2.datasets[0].label= this.translate.nRedeemedRewards[this.selected_language];
                                this.chartData_week.datasets[0].label= this.translate.nRedeemedRewards[this.selected_language];
                                this.options.scales.yAxes[0].scaleLabel.labelString=this.translate.nRedeemedRewards[this.selected_language];
                                this.options.scales.xAxes[0].scaleLabel.labelString=this.translate.date[this.selected_language];
                                this.total_visitors=null;
                            }
                            else{
                                this.chartData2.datasets[0].label= this.translate.nvisitors[this.selected_language];
                                this.chartData_week.datasets[0].label= this.translate.nvisitors[this.selected_language];
                                this.options.scales.yAxes[0].scaleLabel.labelString=this.translate.nvisitors[this.selected_language];
                                this.options.scales.xAxes[0].scaleLabel.labelString=this.translate.date[this.selected_language];
                                if(type=='badges'){
                                    this.redeemed_rewards=null;    
                                }
                            }
                            //Main Chart
                            this.chart_data= (res.data[2]);
                            this.dates= Object.keys(this.chart_data['General']);
                            this.dates.sort();
                            var counter=0;
                            while(counter<this.dates.length){
                                this.general_data[counter]=(this.chart_data['General'][this.dates[counter]]);
                                counter+=1;
                            }
                            this.chart.data.dates=this.dates;
                            this.chart.data.general[0].data=this.general_data;
                            this.min_date_value=this.dates[0];
                            this.max_date_value=this.dates[this.dates.length - 1 ];
                            this.countries= Object.keys(this.chart_data['Countries']);
                            //Second Chart
                            this.second_chart_stats=res.data[3];
                            //Table Data
                            if(this.showTable){ 
                            this.table_data=res.data[4];
     
                            this.table_locations=Object.keys(res.data[4]);
                            }

                            
                        }
                        
                    )
                    .catch((err) => {
                            console.error(err)
                        }
                    );
            },
            fillChartData(cat_name, min_date, max_date) {
                this.chartdata.datasets = [];
                var name='';    
                var date='';    
                var datasets = [];
                var data_values={};
                var min_index = this.chart.data.dates.findIndex(x => x == min_date);
                var max_index = this.chart.data.dates.findIndex(x => x == max_date);
                
                var size = this.chart.data.dates.length;  
                console.log(size) ;
                var counter=0; 
                var index;
                
                if(size > 0){
                    // adjust min_date if selected date has no visitors
                    if (min_index==-1 ) {
                        this.chart.data.dates.push(min_date);
                        this.chart.data.dates.sort();
                    } 
                    
                    // adjust max_date if selected date has no visitors
                    if (max_index==-1) {
                        this.chart.data.dates.push(max_date);
                        this.chart.data.dates.sort();
                    }        
                  
                    this.chartdata.labels = this.chart.data.dates.slice(min_index, max_index+1);
                    //create an array of data for each category
                    for (var index = 0; index < cat_name.length; index++) { 
                        name=cat_name[index]; 
                        data_values[name]=[];
                    } 
                    // fill array of data for each category
                    for (var index = 0; index < this.chartdata.labels.length; index++) { 
                        date=this.chartdata.labels[index];
                        for (var x = 0; x < cat_name.length; x++) { 
                            name=cat_name[x];  
                            if (name in this.chart_data)
                                if (date in this.chart_data[name]) data_values[name][index]=this.chart_data[name][date]
                                else data_values[name][index]=0
                            else cat_name.splice(x,1)
                        } 
                    } 
                    // fill dataset
                    for (var index = 0; index < cat_name.length; index++) { 
                        name=cat_name[index]; 
                        var chosenColor = '#' + parseInt(Math.random() * 0xffffff).toString(16);
                        if(this.chart_data[name]){ 
                            datasets.push(
                                {
                                    label: name,
                                    fill: false,
                                    backgroundColor: chosenColor,
                                    borderColor: chosenColor,
                                    borderWidth: 3.5,
                                    data: data_values[name],
                                }
                            )
                        }
                    }
                    this.chartdata.datasets = datasets;
                    // update chart
                    this.$refs.lineChart.updateData();
                    }
            },
            fillChartData2(min_date, max_date) {   
                var date='';    
                var visitors;
                //second chart
                for (var x = 0; x < 24; x++) { 
                    var hour=this.pad(x);
                    if (hour in this.second_chart_stats) {
                        visitors=0;
                        for (var index = 0; index < this.chartdata.labels.length; index++) { 
                            date=this.chartdata.labels[index];
                            if (date in this.second_chart_stats[hour]) visitors+=this.second_chart_stats[hour][date];       
                        }        
                        this.chartData2.datasets[0].data[x] = visitors;
                    }
                    else {
                        this.chartData2.datasets[0].data[x] = 0;
                    }   
                }   
                // update chart
                this.$refs.barChart2.updateData();
            },
            updateChart(e) {
                if (e.target.id == 'min_date') {
                    // min_date
                    this.min_date_value = e.target.value;
                }
                else {
                    // max_date
                    this.max_date_value = e.target.value;
                }
                this.fillChartData(this.cat_name, this.min_date_value, this.max_date_value);
                this.fillChartData2(this.min_date_value, this.max_date_value);
            },
            pad(d) {
                return (d < 10) ? '0' + d.toString() : d.toString();
            },
            create_week_report(){
                var index= 0;
                var week=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
                
                //Week Report
                for (var x = 0; x < week.length; x++) { 
                    if (week[x] in this.week_stats) {
                        this.chartData_week.datasets[0].data[index] = this.week_stats[week[x]];                         
                    }
                    else {
                        this.chartData_week.datasets[0].data[index] = 0;
                    }
                    this.chartData_week.labels[index] = this.translate[week[x]][this.selected_language];
                    index++; 
                }    
            },
            create_main_chart(){
                this.chartdata.labels = this.chart.data.dates;
                var datasets = [];
                //Main Chart
                var chosenColor = '#' + parseInt(Math.random() * 0xffffff).toString(16);
                datasets.push(
                    {
                        label: this.translate['General'][this.selected_language],
                        fill: false,
                        backgroundColor: chosenColor,
                        borderColor: chosenColor,
                        borderWidth: 3.5,
                        data: this.chart.data.general[0].data,
                    }
                )
                this.chartdata.datasets = datasets;
            },
            create_second_chart(){
                //Second Chart
                for (var x = 0; x < 24; x++) { 
                    var hour=this.pad(x);
                    if (hour in this.second_chart_stats) {
                        this.chartData2.datasets[0].data[x] = this.second_chart_stats[hour]['Total hour visitors'];                     
                    }
                    else {
                        this.chartData2.datasets[0].data[x] = 0;
                    }   
                }              
            },
        },
        /*
            Rendering:
                1. template / render
        */
    }
</script>

<style scoped>
h2 {
    padding: 25px 0px 0px 25px;
    color: #0a4870;
    font-weight: bold;
}
h3 {
    margin: 10px 25px 10px;
    color: #0a4870;
    font-weight: bold;
}
hr {
    margin: 25px 0px 25px 0px;
}
.card_container {
    width: 95%;
    margin: 0 auto 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
.card {
    width: 30%;
    min-width: 250px;
    height: 150px;
    border: 2px solid #0a4870;
    border-radius: 5px;
    background-color: #ccc;
    color: white;
    margin: 10px auto 15px;
    text-align: center;
}
.card2 {
    width: 350px;
    min-width: 250px;
    height: 300px;
    margin: 25px 10px 25px;
    border-radius: 8px;
    border: 1px solid #d3d3d3;
    box-shadow: 0 0 9px 1px rgba(0, 0, 0, 0.2);
    background-color:#fcf9f5;
    text-align: center;
    vertical-align: middle;
}
.chart_container {
    width: 75%;
    min-height: 250px;
    margin: 10px auto 10px;
}
.chart_container2 {
    width: 500px;
    margin: 25px auto 25px;
    
}
.buttons_container1 {
    width: 75%;
    margin: 0 auto 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
.buttons_container2 {
    width: 45%;
    margin: 5px  auto 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
.controller_button {
    border: 1px solid #999;
    border-radius: 5px;
    background-color: #F0F8FF;
    color: black;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 13px;
    font-weight: bold;
    width: 25%;
    min-width: 175px;
    height: 50px;
    margin: 10px auto 10px;
    cursor: pointer;
}
/*
    Table Styling
*/
/*
    Spacing
*/
table {
  
  width: 100%;
  border-collapse: collapse;
}
thead th:nth-child(1) {
  width: 30%;
}
thead th:nth-child(2) {
  width: 20%;
}
thead th:nth-child(3) {
  width: 15%;
}
thead th:nth-child(4) {
  width: 35%;
}
th, td {
  border: 1px solid #ddd;
  text-align: center;
  padding: 8px;
}
/*
    Graphics and colors
*/
tr:hover {
    background-color: #ddd;
} 
th {
    padding-top: 12px;
    padding-bottom: 12px;
    background-color: #0a4870;
    color: white;
}
* {
    color: #444444;
}
h1 {
  padding : 25px;
  margin : auto;
  text-align : center;
}
p {
    font-size: 11px;
}
@media (max-width: 1030px) {
    input[type=date] {
        margin: 15px 5px 15px 5px;
    }
}
</style>
