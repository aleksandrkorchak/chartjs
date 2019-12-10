<template>
    <div class="container">
        <div class="row">
            <button v-on:click="update" class="btn btn-light text mb-1" style="background-color: lightgray !important;" v-if="!is_refresh">Обновить - {{ id }}...
            </button>
            <span class="badge badge-primary mb-1" v-if="is_refresh">Обновление...</span>
            <table class="table">
                <thead>
                <tr>
                    <th>Наименование</th>
                    <th>URL</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="url in urldata">
                    <td>{{ url.title }}</td>
                    <td>{{ url.url }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                urldata: [],
                is_refresh: false, //Статус ajax-запроса
                id: 0
            }
        },
        mounted() {
            this.update()
        },
        methods: {
            update: function () {

                this.is_refresh = true;
                axios.get('/start/get-json').then((response) => {
                    console.log(response);
                    this.urldata = response.data;
                    this.is_refresh = false;
                    this.id++
                });

                // var app = this;
                // axios.get('/start/get-json').then(function (response) {
                //     console.log(response);
                //     app.urldata = response.data;
                //     app.is_refresh = false;
                //     app.id++
                // });

            }
        }
    }
</script>
