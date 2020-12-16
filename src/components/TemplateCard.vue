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
                <div
                    v-if="obj.image_link != undefined"
                >
                    <img
                        v-bind:src="obj.image_link"
                        alt="Avatar"
                    >
                </div>
                <div
                    class="row"
                >
                    <br>
                    <h4
                        v-if="obj.name"
                    >
                        <b>
                            {{obj.name}}
                        </b>
                    </h4>
                    <h4
                        v-else
                    >
                        <b>
                            {{obj.description}}
                        </b>
                    </h4>
                </div>
                <div
                    class="row"
                >
                    <hr>
                    <br>
                </div>
                <div
                    class="row"
                >
                    <router-link
                        :to="obj.management.url"
                        tag="span"
                    >
                        <button
                            class="submit_button"
                        >
                            {{obj.management.text[language]}}
                        </button>
                    </router-link>
                </div>
                <div
                    class="row"
                >
                    <router-link
                        :to="obj.statistics.url"
                        tag="span"
                    >
                        <button
                            class="submit_button"
                        >
                            {{obj.statistics.text[language]}}
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        /*
            Global Awareness:
                1. name
        */
        name: "templatecard",
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
        /*
            Interface:
                1. inheritAttrs
                2. props
                3. emits
        */
        props: {
            objects: {
                type: Array,
                required: true,
            },
            language: {
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
        data: () => {
            return {
                
            }
        }
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

<style scoped>

.grid-container {
    width: 95%;
    min-width: 200px;
    margin: 0 auto 50px;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
    grid-gap: 5px;
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
    width: 320px;
    margin: 20px auto 20px;
}
.id_card:hover {
    box-shadow: 0 8px 20px 0 rgba(0,0,0,0.2);
}
.id_card img {
    height: 270px;
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