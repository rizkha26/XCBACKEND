module.exports = exports = (server, pool) => {
    server.post('/api/login', (req, res) => {
        const { email, password } = req.body;

        pool.query(`SELECT 
        
        * FROM public."user" where "email"= '${email}' and "password"='${password}';`, (error, result) => {
            if (error) {
                res.send(400, {
                    success: false,
                    result: error
                });
            }
            else {
                if (result.rows.length == 0) {
                    res.send(400, {
                        success: false,
                        message: 'User not found'
                    })
                }
                else {

                    res.send(200, {
                        result: result.rows,
                        success: true
                    })
                }
            }
        }

        )
    });

    server.post('/api/register', (req, res) => {
        const { first_name, last_name, email, password } = req.body;
        const query = `INSERT INTO public."user"(
            first_name, last_name, email, password)
            VALUES ('${first_name}', '${last_name}', '${email}', '${password}');`

        pool.query(query, (error, result) => {
            if (error) {
                res.send(400, {
                    success: false,
                    result: error
                });
            }
            else {

                res.send(200, {
                    result: {
                        id: result.rows[0].id,
                        first_name: result.rows[0].first_name
                    },
                    success: true
                })

            }
        }

        )
    });
}