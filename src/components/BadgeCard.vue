<template>
    <div
        class="badge_card"
    >
        <div
            class="badge_column"
        >
            <div
                class="badge_column_text text_left"
            >
                <h5>
                    {{name}}
                </h5>
                <h6>
                    {{description}}
                </h6>
            </div>
        </div>
        <div
            class="badge_column"
        >
            <div
                class="badge_column_text text_center"
            >
                <h5>
                    {{location}}
                </h5>
            </div>
        </div>
        <div
            class="badge_column"
        >
            <div
                class="badge_column_text text_center"
            >
                <h5>
                    {{location}}
                </h5>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Badge Card',
        props: {
            name: {
                type: String,
                default: true
            },
            description: {
                type: String,
                default: true
            },
            location: {
                type: String,
                default: true
            },
            image: {
                default: true
            }
        },
        data () {
            return {
                
            }
        }
    }
</script>

<style scoped>

.badge_card {
    width: 85%;
    margin: 15px auto 15px;
    border: 2px solid red;
    display: grid;
    /*grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));*/
    grid-gap: 5px;
}

.badge_column {
    width: 95%;
    min-width: 750px;
    height: 80px;
    margin: 5px auto 5px;
    border: 2px solid teal;
}

.badge_column_text {
    font-size: 15px;
}

.text_center {
    text-align: center;
}

.text_left {
    text-align: left;
}

h5,
h6 {
    margin: 5px 0px 0px 5px;
}

</style>