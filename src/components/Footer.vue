<template>
    <div>
        <footer>
            <br>
            <div
                class="row"
            >
                Badgio &#169; 2020
            </div>
            <div
                class="row"
            >
                <ul>
                    <li>
                        <span class="mdi mdi-email"></span> - contact@badgio.pt
                    </li>
                    <li>
                        <span class="mdi mdi-home"></span> - Rua da Universidade nº1, Braga, Portugal
                    </li>
                    <li>
                        <span class="mdi mdi-deskphone"></span> - (+351) 253000000
                    </li>
                </ul>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name : "Footer"
}
</script>

<style scoped>

footer {
    text-align: center;
    padding: 3px;
    background-color: #333;
    font-weight: bold;
    color: #fff;
}    

.row {
    width: 100%;
    margin: 0 auto 10px;
    display: flex;
    justify-content: center;
}

span {
    color:white;
}

ul {
    list-style-type: none;
    background-color: #333;
    text-align: left;
}

</style>