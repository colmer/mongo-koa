new Vue({
    el: "#dialog-list",
    data: {
        messages: []
    },
    created: function () {
        this.fetchData()
    },
    methods: {
        fetchData: function() {
            var self = this;

            this.$http.get('/subscribe')
                .then(
                    function(response) {
                        self.messages.push(response.body);
                        self.fetchData();
                    }
                )
                .catch(function(e) {
                    console.log(e);
                    setTimeout(self.fetchData, 2500);
                });
        }
    }
});

new Vue({
    el: '#dialog-form',
    data: {
        textMessage: ''
    },
    methods: {
        sendMessage: function() {
            var self = this;

            this.$http.post('/message', {message: this.textMessage})
                .then(
                    function() {
                        self.textMessage = '';
                    }
                )
                .catch(function (e) {
                    console.log(e);
                });
        }
    }
});
