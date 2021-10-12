import handler from '../../handler';

const BASE_URL = process.env.BACKEND_HOST;

    // Backup
    export default handler
    .post(async (req, res) => {
        const data = req.body;
        await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(preResponse => {
            
            if (preResponse.status === 201) {
                res.status(201).send(preResponse);
            } else {
                preResponse.json()
                    .then(response => {
                        res.status(preResponse.status).send(response);
                    })
                    .catch(error => {
                        
                    })
            }
        })
            .catch(error => {
                
            });
    });