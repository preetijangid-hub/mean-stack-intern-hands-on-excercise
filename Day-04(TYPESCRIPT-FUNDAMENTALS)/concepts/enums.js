"use strict";
var Status;
(function (Status) {
    Status[Status["Pending"] = 0] = "Pending";
    Status[Status["Completed"] = 1] = "Completed";
    Status[Status["Cancelled"] = 2] = "Cancelled";
})(Status || (Status = {}));
console.log(Status.Pending);
console.log(Status.Completed);
