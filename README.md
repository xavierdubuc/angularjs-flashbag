angularjs-flashbag
================

Simple AngularJS module that allows the application to deal with "flash messages".

##Installation

### Step 1 : Add the source js to your project

```html
<!-- index.html -->
...
<script type="text/javascript" src="xd-flashbag.js"></script>
...
```

### Step 2 : Load the module in your angular application
```javascript
//app.js
angular.module('myApp', ['xd.flashbag']);
...
```

## Usage

First, be sure to inject the "flashbag" service.
Then, when you want to add a message, just call `flashbag.set(message);`.
The message variable is an array following this notation :
```javascript
var message = {
    id : 0, // an id for the message
    type : '', // the type of the message (success or error)
    text : '' // the text to display
};
});
```
This call append the new message in the $rootScope variable "messages".
At this point, you can access all these messages in your templates.
Success messages are display for 5 seconds and autohide after, Error and Warning messages for 10 seconds.
To "close" an flash messsage, you juste need to call the function 'remove()' on the flashbag service.
Shortcuts functions exists : `setSuccess(messageText)`, `setWarning(messageText)` and `setError(messageText)` where you just have to provide message text.

## Example

A user edits his profile, it's a good practice to show him a message to confirm the modifications.
In the called function to perform the modifications, just put the call to flashbag.setSuccess() function.

```javascript
// controllers.js (for example)
//distantDatabase is in this example a ngResource object
function myController($scope,flashbag,distantDatabase)
{
    $scope.saveMyModification = function(new_values){
        var success = function(data){ // handler on query success
            flashbag.setSuccess("Well done, your modification has been saved !");
        };
        var error = function(data){ // handler on error success
            flashbag.setError("Sorry a "+data.status+" error occured ... !");
        };
        distantDatabase.saveModifications({
            entity:'users',
            new_values: new_values
        },success,error);
    };
}

```
In your html, you just need to print your messages, in my case I used the angular-ui bootstrap to stylize them.
I recommand the use of a different controller to perform action on messages such as hide it.
```html
<div ng-controller="FlashMessagesController" ng-show="messages.length > 0" class="row alert-notification-bar">
    <div id="message_{{message.id}}"ng-repeat="message in messages" ui-animate class="clearfix ui-animate alert alert-{{message.type}} custom-alert pull-right ">
        <i ng-show="message.type == 'success'" class="icon-ok"></i>
        <i ng-show="message.type == 'error'" class="icon-warning-sign"></i>
        <span ng-bind="message.text"></span>
        <a class="close icon-close" ng-click="hide($event,$index);">&times;</a>
    </div>
</div>
```