<template>
    <div
        class="card"
    >
        <div
            class="row"
        >
            <div
                class="column half image_container"
            >
                <div>
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
                        :placeholder="website"
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
                    :placeholder="this.description"
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
                            :placeholder="social.link"
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ManagementCard',
        props: {
            title: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            paragraphs: {
                type: Array,
                required: true
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
            }
        },
        data: () => {
            return {

            }
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
    background-color: #16B842;
}

.submit_button:hover {
    background-color: #ececec;
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

</style>