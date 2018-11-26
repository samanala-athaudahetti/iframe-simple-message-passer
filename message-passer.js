/* 
 * Simple implementation for iFrame message passing
 */

function messagePasser() {
    this.events = [];
    this.eventsNames = [];

    this.postMessage = function (action, data) {
        window.parent.postMessage({'action': action, 'data': data}, "*");
    };

    this.registerEvent = function (eventName, callbackFunctionName) {
        // callbackFunctionName function should have its 1st param for response
        if (-1 === this.eventsNames.indexOf(eventName)) {
            this.events.push({action: eventName, callback: callbackFunctionName});
            this.eventsNames.push(eventName);
        }
//        this.events[eventName] = callbackFunctionName;
//        this.events[eventName] = this.events[eventName] || null;
//        console.log("registerEvent", this.events);
    };

    this.listen = function () {
        if ('undefined' !== typeof this.events) {
            var events = this.events;
            var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
            var eventer = window[eventMethod];
            var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

            eventer(messageEvent, function (e) {
                events.forEach(function (element) {
                    if (e.data.action === element.action) {
                        eval(element.callback)(e.data.data);
                    }
                });
            }, false);
        }
    };
}
