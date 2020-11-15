<template>
    <div>
        <h2>
            {{pageTitle['en']}}
        </h2>
        <div
            class="card_container"
        >
            <div
                class="card"
            >
                <h4>
                    {{totalVisitors['en']}}
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
                    {{nRedeemedRewards['en']}}
                </h4>
                <br>
                <h5>
                    3096
                </h5>
            </div>
        </div>
        <hr>
        <h3>
            Chart
        </h3>
        <div
            class="chart_container"
        >
            <LineChart
                :chartdata="chartdata"
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
                {{general['en']}}
            </button>
            <button
                class="controller_button"
                v-on:click="fillChartData('age')"
            >
                {{age['en']}}
            </button>
            <button
                class="controller_button"
                v-on:click="fillChartData('gender')"
            >
                {{gender['en']}}
            </button>
            <button
                class="controller_button"
                v-on:click="fillChartData('nationality')"
            >
                {{nationality['en']}}
            </button>
        </div>
    </div>
</template>

<script>

    import LineChart from './LineChart.vue';

    export default {
        name: 'LocationStatistics',
        components: {
            LineChart
        },
        data() {
            return {
                loaded: false,
                pageTitle: {
                    en: 'Statistics - Location...',
                    pt: 'Estatísticas Local...'
                },
                totalVisitors: {
                    en: 'Total Visitors:',
                    pt: 'Total de Visitantes:'
                },
                nRedeemedRewards: {
                    en: 'Nº of Redeemed Rewards',
                    pt: 'Nº de Recompensas Redimidas'
                },
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
                chartdata: {
                    labels: [],
                    datasets: [],
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
                }
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
                        label: obj.label['en'],
                        data: obj.data
                    }
                )
            }

            this.chartdata.datasets = datasets;
        },
        methods: {
            fillChartData(cat_name) {
                console.log('fillChartData(',cat_name,')')
                this.chartdata.datasets = [];
                
                var datasets = [];

                // fill dataset
                for (let obj of this.chart.data[cat_name]) {
                    datasets.push(
                        {
                            label: obj.label['en'],
                            data: obj.data
                        }
                    )
                }

                this.chartdata.datasets = datasets;
                               
            },
        },
    }
</script>

<style>

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
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    width: 175px;
    height: 50px;
    margin: 10px auto 20px;
    cursor: pointer;
}

</style>