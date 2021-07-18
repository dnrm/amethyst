import { NextApiRequest, NextApiResponse } from 'next'
import { APIGateway } from 'aws-sdk'
import { GetApiKeysRequest } from 'aws-sdk/clients/apigateway'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_ACCESS_KEY_ID) {
        res.status(200).send({
            result: false
        })
    } else {
        res.status(200).send({
            result: true
        })
    }
}
