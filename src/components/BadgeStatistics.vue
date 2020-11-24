<template>
    <div>
        <h2>
            {{language.pageTitle[this.selected_language]}}
        </h2>
        <div
            class="card_container"
        >
            <div
                class="card"
            >
                <h4>
                    {{language.totalVisitors[this.selected_language]}}
                </h4>
                <br>
                <h5>
                    10975
                </h5>
            </div>
            <div
                class="card"
            >
                <h4>
                    {{language.nRedeemedRewards[this.selected_language]}}
                </h4>
                <br>
                <h5>
                    3096
                </h5>
            </div>
        </div>
        <hr>
        <h3>
            {{language.chart[this.selected_language]}}
        </h3>
        <div
            class="chart_container"
        >
            <LineChart
                ref="lineChart"
                :chartData="chartdata"
                :options="options"
            />
        </div>
        <div
            class="buttons_container"
        >
            <button
                class="controller_button"
                v-on:click="fillChartData('general')"
            >
                {{language.general[this.selected_language]}}
            </button>
            <button
                class="controller_button"
                v-on:click="fillChartData('age')"
            >
                {{language.age[this.selected_language]}}
            </button>
            <button
                class="controller_button"
                v-on:click="fillChartData('gender')"
            >
                {{language.gender[this.selected_language]}}
            </button>
            <button
                class="controller_button"
                v-on:click="fillChartData('nationality')"
            >
                {{language.nationality[this.selected_language]}}
            </button>
        </div>
        <hr>
        <h3>
            {{language.table[this.selected_language]}}
        </h3>
    </div>
</template>

<script>

    import LineChart from './LineChart.vue';

    export default {
        name: 'BadgeStatistics',
        components: {
            LineChart,
        },
        data() {
            return {
                language: {
                    pageTitle: {
                        en: 'Statistics - Badge ...',
                        pt: 'Estatísticas - Badge ...',
                    },
                    totalVisitors: {
                        en: 'Total Visitors',
                        pt: 'Nº Total de Visitantes',
                    },
                    nRedeemedRewards: {
                        en: 'Nº of Redeemed Rewards',
                        pt: 'Nº de Recompensas Redimidas',
                    },
                    chart: {
                        en: 'Chart',
                        pt: 'Gráfico',
                    },
                    general: {
                        en: 'General',
                        pt: 'Geral'
                    },
                    age: {
                        en: 'Age Range',
                        pt: 'Faixa Etária'
                    },
                    gender: {
                        en: 'Gender',
                        pt: 'Género'
                    },
                    nationality: {
                        en: 'Nationality',
                        pt: 'Nacionalidade'
                    },
                    table: {
                        en: 'Table',
                        pt: 'Tabela',
                        location_name: {
                            en: 'Location',
                            pt: 'Local',
                        },
                        n_of_visitors: {
                            en: 'Total Nº of Visitors',
                            pt: 'Nº Total de Visitantes',
                        },
                    },
                },
                loaded: false,
                chart: {
                    data: {
                        dates: ['01-01-2021', '02-01-2021', '03-01-2021', '04-01-2021'],
                        general: [
                            {
                                label: {
                                    en: 'General',
                                    pt: 'Geral'
                                },
                                data: [50, 1, 2, 3]
                            }
                        ],
                        age: [
                            {
                                label: {
                                    en: '18-29 Years Old',
                                    pt: '18-29 Anos',
                                },
                                data: [0, 1, 2, 3]
                            },
                            {
                                label: {
                                    en: '30-39 Years Old',
                                    pt: '30-39 Anos',
                                },
                                data: [4, 5, 6, 7]
                            },
                            {
                                label: {
                                    en: '40-49 Years Old',
                                    pt: '40-49 Anos',
                                },
                                data: [8, 9, 10, 11]
                            }
                        ],
                        gender: [
                            {
                                label: {
                                    en: 'Female',
                                    pt: 'Feminino',
                                },
                                data: [0, 1, 2, 3]
                            },
                            {
                                label: {
                                    en: 'Male',
                                    pt: 'Masculino',
                                },
                                data: [4, 5, 6, 7]
                            },
                            {
                                label: {
                                    en: 'Other',
                                    pt: 'Outro',
                                },
                                data: [8, 9, 10, 11]
                            }
                        ],
                        nationality: [
                            {
                                label: {
                                    en: 'Portuguese',
                                    pt: 'Portuguesa',
                                },
                                data: [0, 1, 2, 3]
                            },
                            {
                                label: {
                                    en: 'Spanish',
                                    pt: 'Espanhola',
                                },
                                data: [4, 5, 6, 7]
                            },
                            {
                                label: {
                                    en: 'Brazilian',
                                    pt: 'Brasileira',
                                },
                                data: [8, 9, 10, 11]
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
        created() {
            // general chart setup
            this.chartdata.labels = this.chart.data.dates;
            var datasets = [];

            // fill dataset
            for (let obj of this.chart.data.general) {
                datasets.push(
                    {
                        label: obj.label[this.selected_language],
                        data: obj.data
                    }
                )
            }

            this.chartdata.datasets = datasets;
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
        methods: {
            fillChartData(cat_name) {
                
                this.chartdata.datasets = [];
                
                var datasets = [];

                // fill dataset
                for (let obj of this.chart.data[cat_name]) {
                    datasets.push(
                        {
                            label: obj.label[this.selected_language],
                            data: obj.data
                        }
                    )
                }

                this.chartdata.datasets = datasets;

                // update chart
                this.$refs.lineChart.updateData();

            },
        },
    }
</script>

<style scoped>

h2, h3 {
    padding: 25px 0px 0px 25px;
    color: #0a4870;
    font-weight: bold;
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
    color: #5a5a5a;
    margin: 10px auto 15px;
    text-align: center;
}

.chart_container {
    width: 75%;
    min-height: 250px;
    margin: 10px auto 10px;
}

.buttons_container {
    width: 75%;
    margin: 0 auto 15px;
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

</style>