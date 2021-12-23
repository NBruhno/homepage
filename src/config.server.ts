import type { Environment } from 'types'

import { decryptConfig } from 'lib/cipher'

const authPrivateKey = 'USHIJBwdOOOSj0iV1xKtNw==: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'
const authPublicKey = '94kQT2BE0sQPizY/YLKv+A==:ZsgyrJiQqPxeQg/ONtnj/f0GouJUIlF9Y08zmNq36EPUYkAD0TZEw4OJZ3ySpc2avYQ96joL52029U11sW5Howx97XfLggsgG2MtTBNahf+RUjhIXW0gcXeIHEo14KmGP6444bDWCyEyaFUWcbb0XcWS+6c43BUI89+pqiDZzvB5ZCMFoR/RVMJleuDBnvj7LmS/HO95LKEAAzp4Chbie79LGqbVvq+Ra3t/KHBxTsVuKgBQVZFRWODPCRkcHpQfveiKpdy08QGblfl0c8uiUL6WFrY3hOEQAVt0z0UwUW4IL9oiq73bO7WEyOzvoXZmua3kjjtei7e5D4MbhtupatSZX4iIo1KEuJTsqu3xAX2YXIy7OlULvOD/fiaaM/7fBlW2DKgY7ypXxW+V2ycUWsAuIackMId2jT8rJk98WUkmRDKWrNv3SwiwbdEIqmkw3A5hK2U9nJQbJXa0JrrAZ9JK153o/oGIKeJDmRO89bsAu8FRfewgsyxsTh2VCihHjXz+T/gY82oBfrqtrkDF6V4+SUX5BHz9PplseYJYtAVWFcFlbphrM2n82vhgZuaxhb6n6UDcFxubJCYr6z6GI60+/tt5OuRiux1iwxEh9HBOFoGfRloLy03uB4YFwJgpS3DpHELPhngXYgJxuoq9Nj5qweup0mc3xsSenIXmK/yezhwwwcYTYK3kJbN9lwkvHlJ/L7FNFkSswCpCmNE4YOJTn1ZZtbNQ7BH93CxLkNuN9tNt1eFBwt383fPrJVxHuTqC7tTA7IxymX+9rEtuuQ22Ozjn/5kmxJt7BP0nR4hJUcsWe6t5ppZxKKa5NcOLO9ItRk2i+K3Ov7oc1Ktxib6hh0JG9Sy3LZ56DED+kdMAJ+eyxY8sVBsEyBHXq60q2gc3UZxJf8RKTtLLADHUBHvsWwyj3qIYmGeJ8BvyfYsn1uAoMQ57p1yvhjoXYCxbQgyrcOX98X3sTpu4cKPy6hSr2qEe34SSI3zhEQLf6BS5VXCYeHGWM+G5NdD8CVLp+km+NNAIxzdqyNdlNpnj4+tRIYRwlc8E2O+Ia0xZ2w=='

export const config = Object.freeze({
	auth: {
		accessCode: process.env.ACCESS_CODE as string,
		iv: process.env.AUTH_IV as string,
		privateKey: decryptConfig(authPrivateKey),
		publicKey: decryptConfig(authPublicKey),
		secret: process.env.AUTH_SECRET as string,
		systemToken: process.env.AUTH_SYSTEM_TOKEN as string,
	},

	fauna: {
		secret: process.env.FAUNADB_SECRET as string,
	},

	igdb: {
		clientId: process.env.IGDB_CLIENT_ID as string,
		token: process.env.IGDB_TOKEN as string,
	},

	itad: {
		apiKey: process.env.ITAD_TOKEN as string,
	},

	environment: process.env.NODE_ENV === 'test' ? 'development' : process.env.NODE_ENV as Environment,
} as const)
