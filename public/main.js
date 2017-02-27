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
                    console.error(e);
                });
        },
        editUser: function(params) {
            this.$http.patch('/users/' + id)
                .then(
                    function(response) {
                        console.log(response.data);
                    }
                )
                .catch(function(e) {console.error(e)});
        },
        deleteUser: function(id) {
            this.$http.delete('/users/' + id)
                .then(
                    function(response) {
                        console.log(response.data);
                    }
                )
                .catch(function(e) {console.error(e)});
        }
    }
});

new Vue({
    el: '.users-show',
    data: {
        email: '',
        displayName: ''
    },
    created: function () {
        this.fetchData()
    },
    methods: {
        fetchData: function() {
            const url = window.location.href;
            const id = url.split('/').slice(-1);

            this.$http.get('/users/' + id).then(
                function(response) {
                    this.email = response.data.email;
                    this.displayName = response.data.displayName;
                }
            );
        },
        updateUser: function() {
            const url = window.location.href;
            const id = url.split('/').slice(-1);

            let request = {
                email: this.email,
                displayName: this.displayName
            }

            this.$http.patch('/users/' + id, request).then(
                function(response) {
                    this.email = response.data.email;
                    this.displayName = response.data.displayName;
                }
            );
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
