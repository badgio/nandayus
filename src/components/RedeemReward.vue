<template>
    <div>
        <h1>
            {{language.pageTitle[selected_language]}}
        </h1>
        <br>
        <label
            for="rewardCodeInput"
        >
            Reward Code:
        </label>
        <input
            name="rewardCodeInput"
            type="text"
            v-model="reward.code"
        >
        <button
            class="submit_button"
            v-on:click="checkReward"
        >
            Submit
        </button>
        <br>
        <br>
        <div 
            class="alert success"
            v-if="success_banner"
            v-on:click="success_banner=false;"
        >
            <strong>
                {{language.success_form.title[this.selected_language]}}
            </strong>
            {{language.success_form.text[this.selected_language]}}
            <br>
            {{language.form_dismissal[this.selected_language]}}
        </div>
        <div
            class="alert warning"
            v-if="warning_banner"
            v-on:click="warning_banner=false;"
        >
            <strong>
                {{language.warning_form.title[this.selected_language]}}
            </strong>
            {{language.warning_form.text[this.selected_language]}}
            <br>
            {{language.form_dismissal[this.selected_language]}}
        </div>
        <div
            class="alert failure"
            v-if="error_banner"
            v-on:click="error_banner=false;"
        >
            <strong>
                {{language.failure_form.title[this.selected_language]}}
            </strong>
            {{language.failure_form.text[this.selected_language]}}
            <br>
            {{language.form_dismissal[this.selected_language]}}
        </div>
        <div
            class="alert failure"
            v-if="general_error_banner"
            v-on:click="general_error_banner=false;"
        >
            <strong>
                {{language.general_error_form.title[this.selected_language]}}
            </strong>
            {{language.general_error_form.text[this.selected_language]}}
            <br>
            {{language.form_dismissal[this.selected_language]}}
        </div>
        <br>
        <br>
        <div
            class="card"
            v-if="this.reward.uuid"
        >
            <h3>
                Recompensa
            </h3>
            <h5>
                Name: {{this.reward.name}}
            </h5>
             <img
                class="image" 
                :src="this.reward.image" 
                alt="Image failed to load."
            />
        </div>
        <div
            v-else-if="this.showMessage"
        >
            <h3>
                Message: ...
            </h3>
        </div>
    </div>
</template>

<script>

    import axios from 'axios';
    import store from '../store/index.js';
    import { mapGetters } from "vuex";

    export default {
        /*
            Global Awareness:
                1. name
        */
        name : "RedeemReward",
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
        /*
            Composition API:
                1. setup
        */
        /*
            Local State
                1. data
                2. computed
        */
        data: () => (
            {
                language: {
                    pageTitle: {
                        en: 'Redeem Reward',
                        pt: 'Redimir Recompensa',
                    },
                    success_form: {
                        title: {
                            en: 'Success',
                            pt: 'Sucesso',
                        },
                        text: {
                            en: 'The information has been successfully submitted!',
                            pt: 'A informação foi submetida com sucesso!',
                        },
                    },
                    warning_form: {
                        title: {
                            en: 'Warning',
                            pt: 'Aviso',
                        },
                        text: {
                            en: 'Reward is already redeemed.',
                            pt: 'Recompensa já redimida.',
                        },
                    },
                    failure_form: {
                        title: {
                            en: 'Error',
                            pt: 'Erro',
                        },
                        text: {
                            en: 'There is no existing reward with that redeem code. Please check that the code is correctly written.',
                            pt: 'Não existe nenhuma recompensa com esse código de redenção. Por favor verifique que o código se encontra corretamente escrito.',
                        },
                    },
                    general_error_form: {
                        title: {
                            en: 'General Error',
                            pt: 'Erro Geral',
                        },
                        text: {
                            en: 'An error has occurred. If it persists please contact contact@badgio.pt, and explain the situation there.',
                            pt: 'Ocorreu um erro. Se persistir por favor contacte contact@badgio.pt, e explique a situação.'
                        }
                    },
                    form_dismissal: {
                        en: 'Click anywhere on the warning to dismiss it.',
                        pt: 'Clique no aviso para o remover.'
                    },
                },
                reward: {
                    code: '',
                    name: '',
                    uuid: '',
                },  
                success_banner: false,
                warning_banner: false,
                error_banner: false,
                general_error_banner: false,
                showMessage: false,
            }
        ),
        computed: {
            selected_language() {
                return store.getters.getLanguage;
            },
            ...mapGetters(
                {
                    // map `this.user` to `this.$store.getters.user`
                    user: "user"
                }
            ),
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
        /*
        Reactive Properties:
            1. methods
        */
        methods: {
            async checkReward() {
                var idToken = store.getters.getToken;

                let config = {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                        authorization: 'Bearer ' + idToken
                    },
                };

                var data = {
                    reward_code: this.reward.code
                };

                await axios.post(
                    'http://localhost:8001/v0/rewards/redeem',
                    data,
                    config
                ).then(
                    response => {
                        switch(response.status) {
                            case 200:
                                // redeemed badge successfully
                                this.reward.name = response.data.name;
                                this.reward.uuid = response.data.uuid;
                                this.reward.image = response.data.image;
                                this.showMessage = true;
                                break;
                            default:
                                // General error
                                this.general_error_banner = true;
                                break;
                        }
                    }
                ).catch(
                    error => {
                        switch(error.response.status) {
                            case 401:
                                // No badge with that name
                                this.error_banner = true;
                                break;
                            case 404:
                                // No badge with that name
                                this.error_banner = true;
                                break;
                            case 410:
                                // The badge is already redeemed
                                this.warning_banner = true;
                                break;
                        }
                    }
                )
            }
        }
        /*
            Rendering:
                1. template / render
        */
    }
</script>

<style scoped>

* {
    color: #232323;
    box-sizing: border-box;
    text-align: center;
}

h3 {
    padding-top : 15px;
}

p {
    font-size: 12px;
}

h1, h3, h4, h5, h6, p {
    margin: 5px 0px 5px 15px;
    color: #047;
}

input[type=text] {
    height: 30px;
    width: 50%;
    margin: 5px 0px 5px 15px;
    padding: 5px;
    border-radius: 8px;
    border: 1px solid #c8c8c8;
    background-color: white;
}

.submit_button {
    border: 1px solid #999;
    border-radius: 5px;
    background-color: #F0F8FF;
    color: black;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    height: 30px;
    padding: 0px 15px 0px 15px;
    margin: 10px 10px 20px 10px;
    cursor: pointer;
}


.submit_button:hover {
    transition: 0.2s;
    transition-delay: 0.05s;
}

.card {
    width: 50%;
    margin: 25px auto 25px;
    padding-bottom: 15px;
    border-radius: 8px;
    border: 1px solid #d3d3d3;
    box-shadow: 0 0 9px 1px rgba(0, 0, 0, 0.2);
    background-color: white;
}

img {
    align-self: center;
    border: 1px solid #ececec;
    border-radius: 5px;
    margin-top: 15px;
    width: 250px;
    height: 200px;
}

/* Banners */

.alert {    
    padding: 10px 5px;
    margin: 0px auto;
    border-radius: 8px;
    font-size: 14px;
    color: #333333;
}

.success {
    border: 1px solid #3f682f;
    background-color: #589D6D;
}

.success:hover {
    background-color: #487E58;
    transition: 0.3s;
}

.warning {
    border: 1px solid #ffcb11;
    background-color: #ffbf00;
}

.failure {
    border: 1px solid #cb4444;
    background-color: #d47575;
}

.failure:hover {
    background-color: #b04c4c;
    transition: 0.3s;
}

</style>