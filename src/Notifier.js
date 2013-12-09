var Notifier = Backbone.View.extend({
    className: "notifications",

    wait: 1000,

    initialize: function (options) {
        _.extend(this, options);
        this.model.on("flash", _.bind(this.notify, this, "flash"));
        this.model.on("error", _.bind(this.notify, this, "error"));
        this.model.on("success", _.bind(this.notify, this, "success"));
        this.model.on("start:loader", this.startLoader, this);
        this.model.on("start:loader", this.startLoader, this);
        this.model.on("finish:loader", this.finishLoader, this);
        this.model.on("start:progress", this.startProgressBar, this);
        this.model.on("finish:progress", this.finishProgressBar, this);
        this.model.on("update:progress", this.updateProgressBar, this);
    },

    notify: function (type, text, wait) {
        var notification = new Notification({
            text: text,
            type: type,
            wait: wait || this.wait
        }).render();
        this.$el.append(notification.$el);
        return notification;
    },

    startLoader: function (text) {
        if (this.loader) { return; }
        this.loader = new Loader({
            text: text
        }).render();
        this.$el.append(this.loader.el);
    },

    finishLoader: function () {
        this.loader.finish();
        this.loader = null;
    },

    startProgressBar: function (text) {
        if (this.progressBar) { return; }
        this.progressBar = new ProgressBar({
            text: text
        }).render();
        this.$el.append(this.progressBar.el);
    },

    updateProgressBar: function (percent) {
        if (!this.progressBar) { return; }
        this.progressBar.update(percent);
    },

    finishProgressBar: function () {
        if (!this.progressBar) { return; }
        this.progressBar.update(100);
        var _wrappedFinish = _.bind(this.progressBar.finish, this.progressBar);
        _.delay(_wrappedFinish, this.wait);
        this.progressBar = null;
    }

});