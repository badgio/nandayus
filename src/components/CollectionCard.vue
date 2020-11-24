<template>
    <div
        class="collection_card"
    >
        <div
            class="collection_column"
        >
            <img
                class="collection_column_image"
                :src=this.imageURL
                alt="Collection Image"
            >
        </div>
        <input
            class="collection_button"
            type="button"
            value="X"
            v-on:click="removeCollection(id)"
        >
        <div
            class="collection_column"
        >
            <div
                class="collection_column_text text_left"
            >
                <h5>
                    {{name}}
                </h5>
                <h6>
                    {{description}}
                </h6>
                <h6>
                    {{location}}
                </h6>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CollectionCard',
        props: {
            id: {
                type: String,
                default: true
            },
            name: {
                type: String,
                default: true
            },
            description: {
                type: String,
                default: true
            },
            imageURL: {
                type: String,
                default: true
            },
        },
        data () {
            return {
            }
        },
        methods: {
            removeCollection(e) {
                this.$emit('eventRemoveCollection', e);
            }
        }
    }
</script>

<style scoped>

.collection_card {
    width: 85%;
    min-width: 250px;
    margin: 5px auto 5px;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 5px;
    background-color: #eee;
    border: 2px solid #ccc;
    border-radius: 5px;
    position: relative;
}

.collection_column {
    width: 95%;
    min-width: 200px;
    min-height: 95%;
    margin: 0px auto 0px;
}

.collection_column_text {
    font-size: 18px;
}

.collection_column_image {
    width: 100%;
    height: 97.5%;
    max-height: 200px;
    max-width: 300px;
    margin: 0px auto 0px;
    border: 2px solid teal;
}

.collection_button {
    width: 30px;
    height: 30px;
    font-size: 8pt;
    font-weight: bold;
    text-align: center;
    margin-bottom: 3px;
    margin-right: 3px;
    position:absolute;
    bottom:0;
    right:0;
    border-radius: 50%;
    border: 2px solid #666;
    box-shadow: 1px 1px #ccc;
    background-color: #F23A3A;
    color: #333;
}

@media (max-width: 650px) {
    .collection_card {
        width: 95%;
        min-width: 300px;
        margin: 15px auto 15px;
        display: grid;
        grid-gap: 5px;
        grid-template-columns: auto;
    }

    .collection_column {
        min-width: 100%;
        min-height: 100px;
    }

    .collection_column_image {
        max-width: 99%;
        max-height: 100%;
        border-radius: 5px;
    }
}

.text_center {
    text-align: center;
}

.text_left {
    text-align: left;
}

h5,
h6 {
    margin: 15px 0px 15px 5px;
}

</style>