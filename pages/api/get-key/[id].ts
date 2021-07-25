import { NextApiRequest, NextApiResponse } from 'next'
import { APIGateway } from 'aws-sdk'
import * as AWS from 'aws-sdk'
import { GetApiKeyRequest } from 'aws-sdk/clients/apigateway'

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID_DNRM || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_DNRM || '',
    },
})

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const id: string = req.query.id.toString()

    if (!id) {
        res.status(404).send({
            status: 'No id supplied',
        })
    }

    const api = new APIGateway({
        region: 'us-east-1',
    })

    const params: GetApiKeyRequest = {
        apiKey: id,
    }

    try {
        api.getApiKey(params, (err, data) => {
            if (err) {
                res.status(500).send({
                    status: 'server error',
                    error: err,
                })
            } else {
                res.status(200).send({
                    message: 'success',
                    result: data,
                })
            }
        })
    } catch (e) {
        res.status(500).send(e)
    }
}
