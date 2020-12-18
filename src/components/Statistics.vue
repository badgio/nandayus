<template>
    <div>
        <h2>
            {{languageProp.pageTitle[this.selected_language]}} {{$route.params.uuid}}
        </h2>
        <h3>
            Relatório semanal
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
                    10975
                </h4>
                <br>
                <h3>
                    {{languageProp.customerProfile.text[this.selected_language]}}
                </h3>
                <h4>
                    Jovem Português
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
                    3096
                </h4>
                <br>
                <h3>
                    {{languageProp.busiestDay.text[this.selected_language]}}
                </h3>
                <h4>
                    Sábado
                </h4>
            </div>
            <div
                class="chart_container2"
            >
                    Horas de maior movimento
                <bar-chart></bar-chart>
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
                Starting Date:
                <input
                    type="date"
                    id="min_date"
                    name="min_date"
                    ref="min_date"
                    :value="min_date_value"
                    :min="convertDigitIn(this.chart.data.dates[0])"
                    :max="max_date_value"
                    v-on:change="updateChart"
                >
            </label>
            <label>
                Finishing Date:
                <input
                    type="date"
                    id="max_date"
                    name="max_date"
                    ref="max_date"
                    :value="max_date_value"
                    :min="min_date_value"
                    :max="convertDigitIn(this.chart.data.dates[this.chart.data.dates.length-1])"
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
                    v-on:click="cat_name = 'general'; fillChartData('general', min_date_value, max_date_value)"
                    value="general"
                    v-model="chart.pickedCheckbox"
                >
                {{languageProp.general[this.selected_language]}}
            </label>
            <label for="age_checkbox">
                <input 
                    type="radio"
                    name="age_checkbox"
                    v-on:click="cat_name = 'age'; fillChartData('age', min_date_value, max_date_value)"
                    value="age"
                    v-model="chart.pickedCheckbox"
                >
                {{languageProp.age[this.selected_language]}}
            </label>
            <label for="gender_checkbox">
                <input 
                    type="radio"
                    name="gender_checkbox"
                    v-on:click="cat_name = 'gender'; fillChartData('gender', min_date_value, max_date_value)"
                    value="gender"
                    v-model="chart.pickedCheckbox"
                >
                {{languageProp.gender[this.selected_language]}}
            </label>
            <label for="nationality_checkbox">
                <input 
                    type="radio"
                    name="nationality_checkbox"
                    v-on:click="cat_name = 'nationality'; fillChartData('nationality', min_date_value, max_date_value)"
                    value="nationality"
                    v-model="chart.pickedCheckbox"
                >
                {{languageProp.nationality[this.selected_language]}}
            </label>
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
                    v-for="item in this.tabledata"
                    :key="item.index"
                >
                    <td>
                        {{item.name}}
                    </td>
                    <td>
                        {{item.visitors}}
                    </td>
                </tr>
            </table>
        </div>
        <br>
        <hr>
        <h3>Horário Semanal</h3>
        <div
            class="chart_container"
        >
            <bar-chart></bar-chart>
        </div>
    </div>
</template>

<script>

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
                        dates: ['01-01-2021', '02-01-2021', '03-01-2021', '04-01-2021'],
                        general: [
                            {
                                label: {
                                    en: 'General',
                                    pt: 'Geral'
                                },
                                data: [99, 99, 99, 97],
                            },
                        ],
                        age: [
                            {
                                label: {
                                    en: '18-29 Years Old',
                                    pt: '18-29 Anos',
                                },
                                data: [101, 101, 101, 100],
                            },
                            {
                                label: {
                                    en: '30-39 Years Old',
                                    pt: '30-39 Anos',
                                },
                                data: [105, 105, 105, 103],
                            },
                            {
                                label: {
                                    en: '40-49 Years Old',
                                    pt: '40-49 Anos',
                                },
                                data: [107, 107, 107, 105],
                            },
                        ],
                        gender: [
                            {
                                label: {
                                    en: 'Female',
                                    pt: 'Feminino',
                                },
                                data: [120, 120, 120, 119]
                            },
                            {
                                label: {
                                    en: 'Male',
                                    pt: 'Masculino',
                                },
                                data: [122, 122, 122, 123]
                            },
                            {
                                label: {
                                    en: 'Other',
                                    pt: 'Outro',
                                },
                                data: [124, 124, 124, 126]
                            }
                        ],
                        nationality: [
                            {
                                label: {
                                    en: 'Portuguese',
                                    pt: 'Portuguesa',
                                },
                                backgroundColor: '#5a5a5a',
                                data: [200, 200, 200, 205],
                            },
                            {
                                label: {
                                    en: 'Spanish',
                                    pt: 'Espanhola',
                                },
                                data: [140, 140, 140, 144],
                            },
                            {
                                label: {
                                    en: 'Brazilian',
                                    pt: 'Brasileira',
                                },
                                data: [110, 110, 110, 123],
                            }
                        ]
                    },
                    options: {
                        yAxisLabel: {
                            en: 'Nº of Visitors',
                            pt: 'Nº de Visitantes'
                        }
                    }
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Nº of Visitors',
                                }
                            }
                        ],
                        xAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Date'
                                }
                            }
                        ]
                    }
                },
                cat_name: '',
                min_date_value: '',
                max_date_value: '',
                tabledata: [
                    {
                        name: 'Location #1',
                        visitors: 15,
                    },
                    {
                        name: 'Location #2',
                        visitors: 20,
                    },
                    {
                        name: 'Location #3',
                        visitors: 25,
                    },
                    {
                        name: 'Location #4',
                        visitors: 30,
                    },
                    {
                        name: 'Location #5',
                        visitors: 25,
                    },
                    {
                        name: 'Location #6',
                        visitors: 20,
                    },
                    {
                        name: 'Location #7',
                        visitors: 15,
                    },
                ],
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
        created() {
            // general chart setup
            // x axis
            this.chartdata.labels = this.chart.data.dates;
            var datasets = [];
            
            // set min and max date 
            this.cat_name = 'general';
            this.min_date_value = this.chartdata.labels[0].split('-').reverse().join('-');
            this.max_date_value = this.chartdata.labels[this.chartdata.labels.length-1].split('-').reverse().join('-');

            // fill dataset
            // y axis and line stylings
            for (let obj of this.chart.data.general) {
                var chosenColor = '#' + parseInt(Math.random() * 0xffffff).toString(16);
                datasets.push(
                    {
                        label: obj.label[this.selected_language],
                        fill: false,
                        backgroundColor: chosenColor,
                        borderColor: chosenColor,
                        borderWidth: 3.5,
                        data: obj.data,
                    }
                )
            }
            this.chartdata.datasets = datasets;

            console.log('datasets:', this.chartdata.datasets);
            console.log('labels:', this.chartdata.labels);
        },
        /*
        Reactive Properties:
            1. methods
        */
        methods: {
            fillChartData(cat_name, min_date, max_date) {

                this.chartdata.datasets = [];
                
                var datasets = [];

                var min_index = this.chart.data.dates.findIndex(x => x == min_date.split('-').reverse().join('-'))

                var max_index = this.chart.data.dates.findIndex(x => x == max_date.split('-').reverse().join('-'))

                this.chartdata.labels = this.chart.data.dates.slice(min_index, max_index+1);

                // fill dataset
                for (let obj of this.chart.data[cat_name]) {
                    var chosenColor = '#' + parseInt(Math.random() * 0xffffff).toString(16);
                    datasets.push(
                        {
                            label: obj.label[this.selected_language],
                            fill: false,
                            backgroundColor: chosenColor,
                            borderColor: chosenColor,
                            borderWidth: 3.5,
                            data: obj.data,
                        }
                    )
                }

                this.chartdata.datasets = datasets;

                // update chart
                this.$refs.lineChart.updateData();

            },
            convertDigitIn(str){
                return str.split('-').reverse().join('-');
            },
            updateChart(e) {
                console.log('range: ', e.target.id, e.target.value);
                if (e.target.id == 'min_date') {
                    // min_date
                    this.min_date_value = e.target.value;
                }
                else {
                    // max_date
                    this.max_date_value = e.target.value;
                }
                this.fillChartData(this.cat_name, this.min_date_value, this.max_date_value);
            },
            addToSelected(e) {
                this.collection.badges.push(this.all_badges.splice(this.all_badges.findIndex(x => x.id == e), 1)[0]);
                this.searchQuery = null;
            },
            removeFromSelected(e) {
                this.all_badges.push(this.collection.badges.splice(this.collection.badges.findIndex(x => x.id == e), 1)[0]);
            }
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
  table-layout: fixed;
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
    background-color: #4CAF50;
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
