
module.exports = exports = (server, pool) => {
    server.post('/api/customer', (req, res) => {
        const { id_user, no_hp, address } = req.body;
        const query = `INSERT INTO public."customer"(
            id_user, no_hp, address)
            VALUES ('${id_user}', '${no_hp}', '${address}');`

        pool.query(query, (error, result) => {
            if (error) {
                res.send(400, {
                    success: false,
                    result: error
                });
            }
            else {

                res.send(200, {
                    result: "success",
                    success: true
                })

            }
        }

        )
    });

    server.post('/api/customerByUser', (req, res) => {
        const { id_user } = req.body;
        const query = `SELECT * FROM customer where id_user = '${id_user}'`

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