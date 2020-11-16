<template>
    <div>
        <div
            class="grid-container"
        >
            <div
                v-for="obj in objects"
                :key="obj.index"
                class="id_card"
            >
                <img
                    :src="obj.image_link"
                    alt="Avatar"
                >
                <div
                    class="row"
                >
                    <h4>
                        <b>
                            {{obj.name}}
                        </b>
                    </h4>
                </div>
                <div
                    class="row"
                >
                    <hr>
                </div>
                <div
                    class="row"
                >
                    <router-link
                        :to="obj.url"
                        tag="span"
                    >
                        <button
                            class="submit_button"
                        >
                            More
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "templatecard",
        props: {
            objects: {
                type: Array,
                required: true,
            },
        },
        data: () => {
            return {
                
            }
        }
    }
</script>

<style scoped>

.grid-container {
    width: 95%;
    min-width: 275px;
    margin: 0 auto 50px;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.row {
    width: 100%;
}

h4 {
    margin: 0 auto 0;
    text-align: center;
}

hr {
    width: 20%;
    height: 3px;
    margin: 5px auto 0px;
    background: #0a4870;
}

.id_card {
    align-self: center;
    text-align: center;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    font-weight: bold;
    color: #0a4870;
    background-color: #f0f0f0;
    border-color: #0a4870;
    border-radius: 8px;
    border-style: solid;
    border-width: 2px;
    height: 400px;
    width: 250px;
    margin: 10px 10px;
    margin: 10px;
    display: inline-block;
}

.id_card:hover {
    box-shadow: 0 8px 20px 0 rgba(0,0,0,0.2);
}

.id_card img {
    height: 60%;
    width: 100%;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    border-bottom-color: #0a4870;
    border-bottom-style: solid;
    border-bottom-width: 1.5px;
}

.submit_button {
    border: 1px solid #0a4870;
    border-radius: 5px;
    background-color: #F0F8FF;
    color: #0a4870;
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