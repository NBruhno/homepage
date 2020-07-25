import { decryptConfig } from 'server/cipher'

const authPublicKey = 'qT39COgi6m/yts8+5J77wmtq2jvigEJQ9OUfYNvWnfNe1gRTIuYuA2w8NQPw0LwiUfrObyBQPoM4ePWNUxmt/vEh62YHYBc1jCLvT1oaN4YK332rHO16c+dLTt03kmog8A/cQYhNAr0hyOEDQObbwFaoCbzj6iQUat7anAFKnPNCHVqwwqagKuddRCjwnmc1dSg7kR2YzlmqAA9WMD77VkLMj8MCl7tfuvKVqhdSYv0UsLuJAlcWRSSj/HUrdWw3hudNRmIHZhewAZDwcF0VuUuZ+uLBa2YuMdXDw7+fJbL/dvxaAooTG4FBlAjHuL4xGPQjmyR4R1SScl5/FypWm2avf47efFxYneoMqubgz0sRXlrmyodh6qxtacjnyewHEt8aBCbZDaRk6mfQSWcAWfx4UtN024zaXPiFc9wL1/V87iIZi0sJY/HV8a3dzqOhpBwQPd6CjCxEH+OY3Ffk/LzxHA1lxyVVKoWiHe887EnmtNeLuiWaSXV+VVBMAo4vqTcp32xZVzGhg/eVtYBou20w+OsPmjiwq8lHy/oF44AzERC9NBZ+h5jTYHotCc3+LCJnG8ZuYk7htym4AmlY+Cfw9EFpLI2k620A47GHdKaamt1kNUqLSAdSzh2gn4u2yxBHAFIJgVE06nhGKIm/COwoMrr9do387BUvYvlRiobBcSVPsMhi3CieixfkvnqtHEr8p8aEV7Jybv2Ijwu8oP6sIYWZ56dtZU3Il56AEVH5GWeoKngdLnwouDEfHEWwrHE7pnZJJkRNbWWFmaHRtmJF3Ba8v8QB3bohTIvkyqOvdnbwYFHEOEz0UpdEbDHmUpg2fBqffN4yI804JgGQJ2tcV00dVdbBS6AaDYpJNSL+LqwSaE99rwuKBdJ6mZ659PkBbIzh3pUlCm1TgHzUD9MkDoxhNYVdxTPWZQ1Pf7qlhEEAkScLQBPzkcUn90ivUrMFrg2ohTLDsb6AVRO3OhTq5gaHmumrZEGK/IIiogQQ8nEyM23c4b9915CpeG/RSo6FgPyft3VXWe41TzZNDdxlUEOeuqYMSbOB5BlE4MDaBvW59/MWeq49JKfM29jg'
const authPrivateKey = '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'
const authRefreshPublicKey = 'qT39COgi6m/yts8+5J77wmtq2jvigEJQ9OUfYNvWnfNe1gRTIuYuA2w8NQPw0LwiUfrObyBQPoM4ePWNUxmt/pHxiXBAjQyj3Ajp52bCvsqXdKZySHnpCmZziXtmL/uRBFgwL8E9/kravfdrb1jI83wTs423EpQGqBOd7oGLOGjrGdFfXQVJuWt2PhnTetd02Fuo9xak0tKpwKw6Nx1jJJnf4D31oAN4+afGH7geGmGtfstHOeNiyn2liF3l8xy47ttcY/83+qqOsimKllV5fUGcuEG/lcmonVH78eQOderYV9YH8dsl/Xr7S+0OdmyFXF7OidhOMAaA4BuhCAFy6hWGaA1BFcWps92IoIpZMOn7Vg7x+qTzmk0JFV/CBiEYcMxEZGdZJoYquzFvPE6i4LeVKWaDX6AOVZroBSTbjiSr785gZ4WGZ7s2pb5UFeY2D6/t8Mj84USWI3d41/bJs6CyOujY5shRAEazQgDDl1nChntqya2PsonOeoU79m7oIHzu2ashzSC0cwaDxVRWteslepCNqqlAaOna5AgsY7t6OYgLRunTlRdAn8DPtL4qENyNA7UiWtAEV0czbeAo3nyzNCwvY7bPqR5bUL6N+NtUczHbVQ5S7+6Kvo5lLGIn7TYwbKDNq8YfnnnVLNO7TqxByETs1USoN4mL0s8z1exDzyeDlyNgV2sIBx6w5E3oIhTQNmK2MnDzKG/2IOGvgXg5U6+DgPelRmzQDu9gF2OwhuNcmOUr9tgSXFckA1gv3t10r0Kytj2VPhi/VZZU7AkWihFxJWVAM5ZeS+rjOUPW9n17Ok+XJLjHATxmITJflN9s281ZGKupPLd7HN2w8HyV2anJ+vEw/PfNE2ut0IGv7olVegB7fgey9uoKkDTYPZk2O+PlIMrw0gmZjp+RPAZlHrd8qbqtPRNc90qzonh5xTv1SNtpzuHPYOdAjWZQ5YvJ9Uc7FQ0miOgHRxRR6iu1GQWT8Ej643+86VXU/runTQDeY5fKCqnC7C7gC1j2ASLf1pfO4ufeHZHGYAqwwaUn2OCF2HDABzvI8xZOKNYz7cbOuLaa15iC0xX77IBW'
const authRefreshPrivateKey = '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'

export const config = {
	auth: {
		iv: process.env.AUTH_IV,
		publicKey: decryptConfig(authPublicKey),
		privateKey: decryptConfig(authPrivateKey),
		refresh: {
			publicKey: decryptConfig(authRefreshPublicKey),
			privateKey: decryptConfig(authRefreshPrivateKey),
		},
		secret: process.env.AUTH_SECRET,
	},

	fauna: {
		secret: process.env.FAUNADB_SECRET,
		serverKey: process.env.FAUNADB_SERVER_KEY,
	},

	igdb: {
		userKey: process.env.IGDB_USER_KEY,
	},

	environment: process.env.NODE_ENV,
}
