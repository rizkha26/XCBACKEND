
module.exports = exports = (server, pool) => {

    server.post('/api/getProduct', (req, res) => {
        const query = `SELECT * FROM product`

        pool.query(query, (error, result) => {
            if (error) {
                res.send(400, {
                    success: false,
                    result: error
                });
            }
            else {

                res.send(200, {
                    result: result.rows,
                    success: true
                })

            }
        }

        )
    });
}