

var upload = {
    parseUploadFile: function (req, res) {

        console.log(req);


        return res.json({
            'message':'Uploaded Successfully',
            'status':true

        });
        

    }
};

module.exports = upload;