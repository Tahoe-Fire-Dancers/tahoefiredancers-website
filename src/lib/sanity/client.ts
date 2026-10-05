import { createClient, type ClientConfig } from '@sanity/client';

const config: ClientConfig = {
	apiVersion: '2024-10-22',
	projectId: '8n6kitqe',
	dataset: 'production',
	token: '',
	useCdn: true
};

export const client = createClient(config);
