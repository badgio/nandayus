<template>
    <div>
        <h1>
            {{language.pageTitle[this.selected_language]}}
        </h1>
        <div
            class="row"
        >
            <router-link
                class="router"
                :to="toLink"
                tag="span"
            >
                <button
                    class="submit_button"
                >
                    {{language.newButton[this.selected_language]}}
                </button>
            </router-link>
        </div>
        <hr>
        <div
            class="filter"
        >
            <i
                class="mdi mdi-magnify icon"
            > 
            </i>
            <input
                type="text"
                class="search_bar"
                :placeholder="language.filter_text[this.selected_language]"
                v-model="searchQuery"
            >
        </div>
        <TemplateCard
            :objects="result_data"
            :language="this.selected_language"
        />
    </div>
</template>

<script>
 
    import TemplateCard from './TemplateCard.vue';
 
    export default {
        name: 'Location',
        components: {
            TemplateCard,
        },
        props: {
            language: {
                type: Object,
                required: true,
            },
            toLink: {
                type: String,
                required: true,
            },
            data: {
                type: Object,
                required: true,
            }
        },
        data: () => {
            return {
                searchQuery: null,
            }
        },
        computed: {
            selected_language() {
                return this.$store.getters.getLanguage;
            },
            result_data() {
                if (this.searchQuery) {
                    return this.data.filter((item) => {
                        return this.searchQuery.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v));
                    })
                }
                else {
                    return this.data;
                }
            }
        }
    }
</script>

<style scoped>

h1 {
  padding-top : 25px;
  margin : 0 auto 0;
  color: #0a4870;
  font-weight: bold;
  text-align: center;
}

.row {
    width: 100%;
    text-align: center;
}

.router {
    margin: 0px auto 0px;
    text-align: center;
}

.filter {
    float: right;
    margin: 10px 0px 10px 5%;
}

.search_bar {
    height: 35px;
    width: 200px;
    border: 1px solid #999;
    border-radius: 5px;
    box-shadow: 4px 4px #ccc;
}

.submit_button {
    border: 1px solid #0a4870;
    border-radius: 5px;
    background-color: #F0F8FF;
    color: #0a4870;
    text-decoration: none;
    font-size: 16px;
    width: 175px;
    height: 50px;
    cursor: pointer;
}

</style>