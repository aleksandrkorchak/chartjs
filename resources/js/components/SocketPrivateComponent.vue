<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <div class="row form-group">
                    <div class="col-sm-4">
                        <select multiple="" class="form-control" v-model="usersSelect">
                            <option v-for="user in users" :value="'news-action.' + user.id">{{ user.email }}</option>
                        </select>
                    </div>
                    <div class="col-sm-12">
                        <textarea class="form-control" rows="6" readonly>{{ dataMessage.join('\n') }}</textarea>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Наберите сообщение" v-model="message">
                    <div class="input-group-append">
                        <button @click="sendMessage" class="btn btn-outline-secondary" type="button">Отправить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


    export default {
        data: function () {
            return {
                dataMessage: [],
                message: "",
                usersSelect: []
            }
        },
        props: [
            'users',
            'user'
        ],
        created() {
            var socket = io.connect('http://192.168.10.10:3000');



            socket.on("news-action." + this.user.id + ":App\\Events\\PrivateMessage", function (data) {
                console.log(data.message);
                console.log(this.user);
                this.dataMessage.push(data.message.user + ': ' + data.message.message);
            }.bind(this));

            socket.on("news-action.:App\\Events\\PrivateMessage", function (data) {
                this.dataMessage.push(data.message.user + ': ' + data.message.message);
            }.bind(this));


        },
        methods: {

            sendMessage: function () {

                if (!this.usersSelect.length) {
                    this.usersSelect.push('news-action.')
                }

                axios({
                    method: 'get',
                    url: '/start/send-private-message',
                    params: {
                        channels: this.usersSelect,
                        message: this.message,
                        user: this.user.email
                    }
                }).then((response) => {
                    this.dataMessage.push(this.user.email + ': ' + this.message);
                    this.message = "";
                });
            }
        }
    }
</script>
