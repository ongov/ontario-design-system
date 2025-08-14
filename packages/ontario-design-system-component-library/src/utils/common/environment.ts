export function isServerSideRendering(): boolean {
	return typeof window === 'undefined';
}

export function isClientSideRendering(): boolean {
	return typeof window !== 'undefined';
}
