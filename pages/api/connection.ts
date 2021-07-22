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

    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_ACCESS_KEY_ID) {
        res.status(200).send({
            result: false,
        })
    } else {
        res.status(200).send({
            result: true,
        })
    }
}
