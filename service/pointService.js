
module.exports = exports = (server, pool) => {

    server.post('/api/addPoint', (req, res) => {
        const { id_user, point } = req.body;
        const query = `INSERT INTO public."point"(
            id_user, point)
            VALUES ('${id_user}', 0);`

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

    server.put('/api/updatePoint', (req, res) => {
        const { id_user, point } = req.body;
        const query = `UPDATE public.point
        SET point= ${point}
        WHERE id_user = ${id_user};`

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

    server.post('/api/getPointByUser', (req, res) => {
        const { id_user } = req.body;

        const query = `SELECT * FROM point where id_user = ${id_user}`

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