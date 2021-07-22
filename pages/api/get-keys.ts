import { NextApiRequest, NextApiResponse } from 'next'
import { APIGateway } from 'aws-sdk'
import { GetApiKeysRequest } from 'aws-sdk/clients/apigateway'
import { getSession } from 'next-auth/client'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req })

    if (!session) {
        res.status(403).send({
            status: 403,
            message: 'Unauthorised',
        })
    }

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
