export interface WrapperEnv {
	__VITE_INVOKE_MODULE__: {
		fetch: (request: Request) => Promise<Response>;
	};
	__VITE_UNSAFE_EVAL__: {
		eval: (code: string, filename: string) => Function;
	};
	[key: string]: unknown;
}

export function stripInternalEnv(internalEnv: WrapperEnv) {
	const { __VITE_INVOKE_MODULE__, __VITE_UNSAFE_EVAL__, ...userEnv } =
		internalEnv;

	return userEnv;
}
