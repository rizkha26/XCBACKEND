
module.exports = exports = (server, pool) => {
    server.post('/api/addFirstSaldo', (req, res) => {
        const { id_user } = req.body;
        const query = `INSERT INTO public."saldo"(
            id_user, saldo,method_topup)
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
                    result: "success",
                    success: true
                })
            }
        });
    });

    server.post('/api/addSaldo', (req, res) => {
        const { id_user, saldo, method_topup } = req.body;
        const query = `UPDATE public.point
            set saldo = '${saldo}' WHERE id_user = ${id_user};`

        pool.query(query, (error, result) => {
            if (error) {
                res.send(400, {
                    success: false,
                    result: error
                });
            }
            else {
                const id_saldo = result.rows[0].id
                const queryHis = `INSERT INTO public."history_saldo"(
                    id_saldo,type, his_saldo)
                    VALUES ('${id_saldo}', 'plus','${saldo}');`

                pool.query(queryHis, (error, result) => {
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
                })
            }
        });
    });


    server.post('/api/getSaldoByUser', (req, res) => {
        const { id_user } = req.body;
        console.log(id_user)
        const query = `SELECT * FROM saldo where id_user = ${id_user}`

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