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
                <h3>
                    {{totalVisitors['en']}}
                </h3>
                <br>
                <h4>
                    10975
                </h4>
            </div>
            <div
                class="card"
            >
                <h3>
                    {{nRedeemedRewards['en']}}
                </h3>
                <br>
                <h4>
                    3096
                </h4>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Location Statistics',
        data() {
            return {
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
                }
            }
        }
    }
</script>

<style>

h2 {
    padding: 25px 0px 30px 25px;
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
    width: 40%;
    min-width: 250px;
    height: 150px;
    border: 2px solid #0a4870;
    border-radius: 5px;
    background-color: #ccc;
    color: #5a5a5a;
    margin: 10px auto 15px;
    text-align: center;
}

</style>