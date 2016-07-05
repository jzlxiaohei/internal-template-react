module.exports = {
    ns: '/',
    data: [
        {
            path: '/',
            type: 'json', //now only support json
            method: 'get', //default get
            //正确的结果
            success: {
                msg:'hello world'
            },
            //url上有 __error=1 的 querystring,则返回错误结果
            error: {} 
        }

    ]
}
