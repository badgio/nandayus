<template>
    <div>
        <div 
            id="myModal"
            class="modal"
            v-if="displayModal"
        >
            <!-- Modal content -->
            <div 
                class="modal-content"
            >
                <div
                    class="modal-body"
                >
                    <span
                        class="close"
                        v-on:click="displayModal = !displayModal"
                    >
                        &times;
                    </span>
                    <br>
                    <br>
                    <h6>
                        Are you sure you want to delete the Badge?
                    </h6>
                    <br>
                    <div
                        style="width: 100%; display: flex; justify-content: center;"
                    >
                        <button
                            class="submit_button"
                            v-on:click="deleteObject"
                        >
                            Yes, I'm sure
                        </button>
                        <button
                            class="submit_button"
                            v-on:click="displayModal = !displayModal"
                        >
                            No, please take me back
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="card"
        >
            <div
                class="row"
            >
                <div
                    class="column half image_container"
                >
                    <div
                        v-if="this.image != undefined"
                    >
                        <div
                            class="overlay-image"
                        >
                            <div
                                v-on:click="onFileChange"
                            >
                                <img
                                    class="image" 
                                    :src="this.image" 
                                    alt="Alt text"
                                />
                                <div 
                                    class="hover"
                                >
                                    <div 
                                        class="text"
                                    >
                                        <input
                                            type="file"
                                            id="myFile"
                                            name="filename"
                                            value="SSSSSubmit"
                                            style="width: 100px; margin: 0 auto;"
                                            required
                                            v-on:change="onFileChange"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="column half"
                >
                    <h3>
                        {{title}}
                    </h3>
                    <p
                        v-for="par in paragraphs"
                        :key="par.index"
                    >
                        {{par.type['en']}}: {{par.text}}
                    </p>
                    <div
                        v-if="website"
                    >
                        <p>
                            Website
                        </p>
                        <input
                            type="text"
                            :value="website"
                        >
                    </div>
                </div>
            </div>
            <div
                class="row"
                v-if="description"
            >
                <div
                    class="column full"
                >
                    <p>
                        Description:
                    </p>
                    <textarea
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        :value="this.description"
                    >
                    </textarea>
                </div>
            </div>
            <div
                class="row"
            >
                <div
                    class="column full"
                >
                    <div
                        v-if="social_networks.length > 0"
                    >
                        <div
                            v-for="social in social_networks"
                            :key="social.index"
                        >
                            <p>
                                {{social.name}}
                            </p>
                            <input
                                type="text"
                                :value  ="social.link"
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div
                style="width: 100%; display: flex; justify-content: center;"
            >
                <button
                    class="submit_button"
                    v-on:click="displayModal = !displayModal"
                >
                    {{this.delete_text[this.selected_language]}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>

    import axios from 'axios';
    import store from '../store/index.js';

    export default {
        name: 'ManagementCard',
        props: {
            title: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: false,
            },
            paragraphs: {
                type: Array,
                required: true,
            },
            description: {
                type: String,
                required: false
            },
            website: {
                type: String,
                required: false,
            },
            social_networks: {
                type: Array,
                required: false
            },
            delete_text: {
                type: Object,
                required: false,
            },
            delete_link: {
                type: String,
                required: false,
            },
        },
        data: () => {
            return {
                displayModal: false,
            }
        },
        computed: {
            selected_language() {
                return this.$store.getters.getLanguage;
            },
        },
        methods: {
            onFileChange(e) {
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e => {
                    this.image = e.target.result;
                    
                };
            },
            async deleteObject(e) {
                var idToken = store.getters.getToken;

                console.log(this.delete_link)

                const res = await axios.delete(this.delete_link, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                        authorization: 'Bearer ' + idToken
                    },
                });
                if (res.status == 200) {
                    this.$router.push({ path: '/rewards' })
                }
                else {
                    console.log('Something went wrong... HTTP Status [', res.status, ']');
                }
            }
        },
    }
</script>

<style scoped>

* {
    color: #232323;
    box-sizing: border-box;
}

h3 {
    padding-top : 15px;
}

p {
    font-size: 12px;
}

h3, h6, p {
    margin: 5px 0px 5px 15px;
    color: #047;
}

.card {
    width: 90%;
    margin: 25px auto 25px;
    padding-bottom: 15px;
    border-radius: 8px;
    border: 1px solid #d3d3d3;
    box-shadow: 0 0 9px 1px rgba(0, 0, 0, 0.2);
    background-color: white;
}

/* Create two equal columns that floats next to each other */
.column {
    float: right;
    padding: 10px;
    border-radius: 5px;
}

.half {
    width: 50%;
}

.full {
    width: 100%;
}

.row:after {
    width: 95%;
    margin: 0 auto;
    content: "";
    display: table;
    clear: both;
}

input[type=text] {
    height: 30px;
    width: 95%;
    margin: 5px 0px 5px 15px;
    padding: 5px;
    border-radius: 8px;
    border: 1px solid #c8c8c8;
    background-color: #ececec;
}

input[type='file'] {
  color: transparent;
}

textarea {
    width: 95%;
    margin: 5px 0px 5px 15px;
    padding: 5px;
    border-radius: 8px;
    border: 1px solid #c8c8c8;
    background-color: #ececec;
}

.submit_button {
    margin: 10px auto;
    min-width: 75px;
    min-height: 35px;
    border-radius: 8px;
    border: 1px solid #ececec;
    color: white;
    background-color: #F52B2B;
}

.submit_button:hover {
    background-color: #C13A3A;
    transition: 0.2s;
    transition-delay: 0.05s;
}

.image_container {
    position: relative;
    display: flex;
    justify-content: center;
}

img {
    align-self: center;
    border: 1px solid #ececec;
    border-radius: 5px;
    width: 100%;
    height: 80%;
    margin-top: 15px;
    max-width: 400px;
    max-height: 250px;
}


@media only screen and (max-width: 600px) {
    .column {
        width: 100%;
    }

    .card_image {
        margin: 0px auto 0px;
        width: 90%;
        height: 85%;
    }
}


/**/

/********* Simple or original overlay *******/

/* Main container */

.overlay-image {
 position: relative;
 width: 100%;
}

/* Original image */
.overlay-image .image {
 display: block;
 width: 100%;
 height: auto;
}

/* Original text overlay */
.overlay-image .text {
 color: #fff;
 font-size: 30px;
 line-height: 1.5em;
 text-shadow: 2px 2px 2px #000;
 text-align: center;
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 width: 100%;
}

/********* Overlay on hover *******/
/* New overlay on hover */
.overlay-image .hover {
 position: absolute;
 top: 0;
 height: 99%;
 width: 100%;
 opacity: 0;
 border-radius: 5px;
 transition: .5s ease;
}
/* New overlay appearance on hover */
.overlay-image:hover .hover {
 opacity: 1;
}

/********* Background and text only overlay on hover *******/
.overlay-image .normal {
 transition: .5s ease;
}
.overlay-image:hover .normal {
 opacity: 0;
}
.overlay-image .hover {
 background-color: rgba(0,0,0,0.5);
}

/* Modal */

.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 300px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {top:-300px; opacity:0} 
  to {top:0; opacity:1}
}

@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

/* The Close Button */
.close {
  color: black;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: 2px 16px;
  background-color: #ececec;
  color: white;
}

.modal-body {padding: 2px 16px;}

.modal-footer {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
}

</style>