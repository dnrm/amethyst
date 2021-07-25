import { NextApiRequest, NextApiResponse } from 'next'
import { APIGateway } from 'aws-sdk'
import { UpdateApiKeyRequest } from 'aws-sdk/clients/apigateway'
import { getSession } from 'next-auth/client'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req })

    if (!session || session?.user?.email != 'daniel@medina.com') {
        res.status(403).send({
            status: 403,
            message: 'Unauthorised',
        })
        return
    }

    const api = new APIGateway({
        region: 'us-east-1',
    })

    const params: UpdateApiKeyRequest = {
        apiKey: req.body['id'],
        patchOperations: [
            { op: 'replace', path: '/name', value: req.body.name },
            {
                op: 'replace',
                path: '/description',
                value: req.body.description,
            },
            { op: 'replace', path: '/enabled', value: req.body.enabled ? 'true' : 'false' },
        ],
    }

    api.updateApiKey(params, (err, data) => {
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
