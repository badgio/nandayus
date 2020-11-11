<template>
    <div>
        <div
            class="grid-container"
        >
            <div
                v-for="person in persons"
                :key="person.index"
                class="id_card"
            >
                <img
                    :src="person.image_link"
                    alt="Avatar"
                    style="width:100%"
                >
                <div class="container">
                    <h4>
                        <b>
                            {{person.name}}
                        </b>
                    </h4> 
                    <p>
                        {{person.job}}
                    </p> 
                </div>
                <button
                    class="submit_button"
                >
                    For more info
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "templatecard",
        data: () => {
            return {
                persons: [
                    {
                        name: "John Doe #1",
                        image_link: "http://www.jamiesale-cartoonist.com/wp-content/uploads/cartoon-business-man-free1.png",
                        job: "Architect"
                    },
                    {
                        name: "John Doe #2",
                        image_link: "http://www.jamiesale-cartoonist.com/wp-content/uploads/cartoon-business-man-free1.png",
                        job: "Architect"
                    },
                    {
                        name: "John Doe #3",
                        image_link: "http://www.jamiesale-cartoonist.com/wp-content/uploads/cartoon-business-man-free1.png",
                        job: "Architect"
                    },
                    {
                        name: "John Doe #4",
                        image_link: "http://www.jamiesale-cartoonist.com/wp-content/uploads/cartoon-business-man-free1.png",
                        job: "Architect"
                    },
                    {
                        name: "John Doe #5",
                        image_link: "http://www.jamiesale-cartoonist.com/wp-content/uploads/cartoon-business-man-free1.png",
                        job: "Architect"
                    },
                    {
                        name: "John Doe #6",
                        image_link: "http://www.jamiesale-cartoonist.com/wp-content/uploads/cartoon-business-man-free1.png",
                        job: "Architect"
                    },
                    {
                        name: "John Doe #7",
                        image_link: "http://www.jamiesale-cartoonist.com/wp-content/uploads/cartoon-business-man-free1.png",
                        job: "Architect"
                    },
                    {
                        name: "John Doe #8",
                        image_link: "http://www.jamiesale-cartoonist.com/wp-content/uploads/cartoon-business-man-free1.png",
                        job: "Architect"
                    },
                    {
                        name: "John Doe #9",
                        image_link: "http://www.jamiesale-cartoonist.com/wp-content/uploads/cartoon-business-man-free1.png",
                        job: "Architect"
                    },
                ],
            }
        }
    }
</script>

<style>

.grid-container {
    width: 95%;
    min-width: 200px;
    margin: 0 auto 50px;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(205px, 1fr));
    grid-gap: 25px;
}

.container {
  padding: 2px 16px;
}

.id_card {
    align-self: center;
    text-align: center;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-color: grey;
    border-radius: 8px;
    border-style: solid;
    border-width: 1px;
    height: 100%;
    width: 200px;
    margin: 20px auto 0px;
}

.id_card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.submit_button {
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
    margin: 10px auto 10px;
    cursor: pointer;
}

</style>