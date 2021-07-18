import { NextApiRequest, NextApiResponse } from 'next'
import { APIGateway } from 'aws-sdk'
import { GetApiKeysRequest } from 'aws-sdk/clients/apigateway'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const api = new APIGateway({
        region: 'us-east-1',
    })

    const params: GetApiKeysRequest = {
        includeValues: false,
    }

    api.getApiKeys(params, (err, data) => {
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
}
