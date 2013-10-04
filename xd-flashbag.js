angular.module('xd.flashbag', []).factory('flashbag', function($rootScope){
    /** messages */
    var messages = [];
    /** amount of messages*/
    var i = 0;

    /**
     * Add messages to the rootscope.
     */
    $rootScope.$on('notification', function(){
        $rootScope.messages = messages;
    });

    /**
     * When asked to hide a notification, hide it and refresh $rootScope messages.
     */
    $rootScope.$on('hide_notification', function(){
        messages.pop();
        i--;
        $rootScope.$apply('$rootScope.messages = messages;');
    });

    /**
     * Add a new message
     * @param {array} msg the message to add
     * @returns {undefined} nothing.
     */
    this.set = function(msg)
    {
        messages.push(msg);
        i++;
        $rootScope.$emit('notification');
        var f = function(){
            $rootScope.$emit('hide_notification');
        };
        if(msg.type !== 'error')
            setTimeout(f,5000);
    };

    /**
     * Add a new success message
     * @param {string} success_text the text of the success message
     * @returns {undefined} nothing
     */
    this.setSuccess = function(success_text)
    {
        var message = {
            id : i,
            type : 'success',
            text : success_text
        };
        this.set(message);
    };

    /**
     * Add a new error message
     * @param {string} error_text the text of the error message
     * @returns {undefined} nothing
     */
    this.setError = function(error_text)
    {
        var message = {
            id: i,
            type : 'error',
            text : error_text
        };
        this.set(message);
    };

    /**
     * Get all the messages.
     * @returns {Array} the messages.
     */
    this.get = function()
    {
        return messages;
    };

    /**
     * Remove a message.
     * @returns {array} the removed message.
     */
    this.remove = function()
    {
        i--;
        return messages.pop();
    };

    /**
     * Remove all messages.
     * @returns {undefined} nothing
     */
    this.empty = function()
    {
        i = 0;
        messages = [];
    };

    return this;
});