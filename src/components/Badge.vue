<template>
    <div>
        <div
            class="card collection_card"
        >
            <div
                class="left_col_75"
            >
                <h3>
                    {{this.badge.name}}
                </h3>
                <h6>
                    State: {{this.badge.state}}
                </h6>
                <h6>
                    Location: {{this.badge.location}}
                </h6>
                <h6>
                    Collection: {{this.badge.collection}}
                </h6>
                <h6>
                    Validity: {{this.badge.validity}}
                </h6>
                <h6>
                    Description:
                </h6>
                <textarea
                    name="description"
                    id="description_1"
                    class = "desc_textarea"
                    :cols = "60"
                    :rows = "8"
                    required
                    v-model="badge.description"
                >
                </textarea>
            </div>
            <div
                class="right_col_25"
            >
                <div
                    id="imgPreview"
                >
                    <br>
                    <img
                        class="card_image"
                        src="https://media.istockphoto.com/photos/staff-working-behind-counter-in-busy-coffee-shop-picture-id900816038"
                        width=160px
                        height=135px
                    />
                    <br>
                    <button
                        class="submit_button"
                    >
                        Browse File
                    </button>
                </div>
            </div>
        </div>
        <br>
        <div
            class="row"
        >
            <button
                class="submit_button"
            >
                Submit Changes
            </button>
        </div>
    </div>
</template>

<script>

    

    export default {
        name: 'Badge',
        data: () => {
            return {
                pageTitle: "Badge",
                badge: {
                    name: 'Badge X',
                    state: 'Approved',
                    location: 'Centro',
                    collection: 'Verde Cool',
                    validity: 'Permanent',
                    description: '',
                    image: '',
                },
                obligatory_warning: {
                   pt: 'Todos os campos assinalados com * são de preenchimento obrigatório.',
                   en: 'All fields signaled by * are required.'
                },
            }
        },
        methods: {
            submitForm(e) {
                console.log('All gucci')
            },
            onFileChange(e) {
                const file = e.target.files[0];
                this.collection.image = URL.createObjectURL(file);
            },
        },
    }
</script>

<style scoped>

* {
  box-sizing: border-box;
  color: #0a4870;
}

.card {
    width: 85%;
    margin: 0 auto;
    background-color: #eee;
    border: 2px solid teal;
    border-radius: 5px;
}

.collection_card {
    height: 300px;
    display: grid;
    grid-auto-columns: 60% 40%;
}

.left_col_75 {
    grid-column: 1 / 2;
}

.right_col_25 {
    grid-column: 2 / 3;
}

.card_image {
    margin: 0px auto 0px;
    width: 95%;
    height: 65%;
    max-width: 300px;
    max-height: 350px;
    min-width: 150px;
    min-height: 165px;
}

.social_networks_card {
    display: grid;
}

input {
    height: 35px;
    margin: 0px 0px 10px 15px;
    border: 1px solid #999;
    border-radius: 5px;
    box-shadow: 4px 4px #ccc;
}

.social_networks_card > input {
    width: 95%;
}

.badge_card > .input_icons {
    width: 100%;
}

.badge_card > .input_icons > input {
    width: 75%;
}

.icon { 
    padding: 10px; 
    color: green; 
    min-width: 50px; 
    text-align: center; 
} 

.badge_card >.input_icons > button {
    margin: 0px 0px 10px 15px;
    width: 80px;
    height: 35px;
}

.badge_card > .badge_results {
    width: 65%;
    min-width: 280px;
    margin-left: 50px; 
}

.badge_card > .badge_results > .queried_badge {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    min-height: 40px;
    margin: 5px auto 5px;
    background-color: white;
    border: 1px solid #0a4870;
    border-radius: 5px;
}

.badge_card > .badge_results > .queried_badge > .badge_button {
    width: 30px;
    height: 30px;
    font-size: 12pt;
    font-weight: bold;
    text-align: left;
    margin: 5px;
    border-radius: 50%;
    border: 2px solid #0a4870;
    box-shadow: 1px 1px #ccc;
    background-color: #24702C;
    color: white;
}

h3 {
    padding-top : 15px;
}

p {
    font-size: 12px;
}

h3, h6, p {
    margin: 5px 0px 5px 15px;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (also change the direction - make the "cart" column go on top) */
@media (max-width: 650px) {
    .card {
        width: 95%;
    }

    .collection_card {
        height: 600px;
        grid-auto-columns: 100%;
        grid-auto-rows: 50% 50%;
    }

    .left_col_75 {
        grid-row: 2 / 3;
        width: 95%;
        margin: 0 auto;
        text-align: center;
    }

    .right_col_25 {
        width: 95%;
        margin: 0 auto;
        grid-column: 1 / 2;
    }

    .card_image {
        margin: 0px auto 0px;
        width: 90%;
        height: 85%;
    }

}

#imgPreview {
    margin: 0 auto 0;
    font-weight: bold;
    text-align: center;
}

#imgPreview button {
    width: 100;
    margin: 0 auto;
    text-align: center;
}

#imgPreview img {
    border: 2px solid #0a4870;
    border-radius: 5px;
}

input[type='file'] {
  color: transparent;
}

.row {
    width: 100%;
    display: flex;
    justify-content: center;
}

.row > button {
    border: 1px solid #999;
    border-radius: 5px;
    background-color: #F0F8FF;
    color: black;
    padding: 15px 15px;
    text-align: center;
    text-decoration: none;
    font-size: 12px;
    font-weight: bold;
    width: 150px;
    margin: 10px auto;
    cursor: pointer;
}

.desc_textarea {
    width: 90%;
    margin: 0px 0px 0px 15px;
    border: 1px solid #999;
    border-radius: 5px;
    box-shadow: 4px 4px #ccc;
}

</style>