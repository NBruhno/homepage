export enum UserTokenType {
	Refresh = 'refresh',
	/** Intermediate token used when the user has 2FA enabled, only acting as a communication layer */
	Intermediate = 'intermediate',
	Access = 'access',
}
