import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		// adapter-auto uses the Vercel adapter automatically when deployed on Vercel
		// (Vercel sets the VERCEL env variable). Locally it falls back to adapter-node.
		adapter: adapter()
	}
};

export default config;
