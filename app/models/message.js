/**
 * Created by yitaolee on 15-4-20.
 * for communicating with server using json
 */

function Message(status,message) {
    this.status = status;
    this.message = message;
};

module.exports = Message;

Message.prototype.toJson =  function() {
    //save to database
    return "{\"status\":\""+this.status+"\",\"message\":\""+this.message+"\"}";

};
