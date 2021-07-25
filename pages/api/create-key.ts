// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CreateApiKeyRequest } from 'aws-sdk/clients/apigateway'
import type { NextApiRequest, NextApiResponse } from 'next'
const AWS = require('aws-sdk')
import { getSession } from 'next-auth/client'

type Data = {
    name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    return { message: 'WIP' }

    const session = await getSession({ req })

    if (!session) {
        res.status(403).send({
            status: 403,
            message: 'Unauthorised'
        })
    }

    const AWS = require('aws-sdk')

    AWS.config.region = 'us-east-1'

    const apigateway = new AWS.APIGateway()
    let key

    let params: CreateApiKeyRequest = {
        name: 'Test',
        description: 'Test API Key',
        enabled: true,
        stageKeys: [
            {
                restApiId: 'zhhh6msy84',
                stageName: 'default',
            },
        ],
    }

    try {
        apigateway.createApiKey(params, (err: any, data: any) => {
            if (err) {
                res.status(500).send({
                    status: 500,
                    message: 'Internal server error',
                })
                return;
            } else {
                key = data

                apigateway.createUsagePlanKey(
                    {
                        usagePlanId: 'c0ms8z',
                        keyId: key.id,
                        keyType: 'API_KEY',
                    },
                    (err: any, data: any) => {
                        if (err) {
                            res.status(500).send({
                                status: 500,
                                message: 'Internal server error',
                            })
                            return
                        } else {
                            res.status(200).send({
                                status: 200,
                                message: 'Key created successfully',
                                key: data,
                            })
                            return
                        }
                    }
                )
            }
        })
    } catch (e) {
        console.log('Creation failed')
    }
}
