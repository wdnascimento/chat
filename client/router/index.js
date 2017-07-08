Router.route("/", function() {
    this.render("main");
});



Router.route("/chat/:_id", function() {
    this.render("messages", {
        data: function() {
                var _id = this.params._id;
            }
    });
});

Router.route("/chat", function() {
    this.render("chats");
});