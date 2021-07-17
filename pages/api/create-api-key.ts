// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CreateApiKeyRequest } from 'aws-sdk/clients/apigateway'
import type { NextApiRequest, NextApiResponse } from 'next'
const AWS = require('aws-sdk')

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const AWS = require('aws-sdk')

    AWS.config.region = 'us-east-1'

    const apigateway = new AWS.APIGateway()
    let key

    apigateway.createApiKey(
        {
            name: 'Test',
            description: 'Test API Key',
            enabled: true,
            stageKeys: [
                {
                    restApiId: 'zhhh6msy84',
                    stageName: 'default',
                },
            ],
        },
        (err: any, data: any) => {
            if (err) console.log(err.stack)
            else {
                key = data

                apigateway.createUsagePlanKey(
                    {
                        usagePlanId: 'c0ms8z',
                        keyId: key.id,
                        keyType: 'API_KEY',
                    },
                    (err: any, data: any) => {
                        if (err) console.log(err, err.stack)
                        else console.log(data)
                    }
                )
            }
        }
    )
    res.status(200).json({ name: 'John Doe' })
}
