new Vue({
    el: ".users__list",
    data: {
        users: []
    },
    created: function () {
        this.fetchData()
    },
    methods: {
        fetchData: function() {
            var self = this;

            this.$http.get('/users')
                .then(
                    function(response) {
                        self.users = response.body;
                    }
                )
                .catch(function(e) {
                    console.log(e);
                });
        }
    }
});

new Vue({
    el: '.users__form',
    data: {
        email: '',
        displayName: ''
    },
    methods: {
        createUser: function() {
            var self = this;

            this.$http.post('/users', {
                email: this.email,
                displayName: this.displayName
            })
            .then(
                function() {
                    self.displayName = '';
                    self.email = '';
                }
            )
            .catch(function (e) {
                console.log(e);
            });
        }
    }
});
