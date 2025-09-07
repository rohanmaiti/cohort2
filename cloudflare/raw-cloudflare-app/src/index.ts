/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
        const method = request.method;
		switch (method) {
           case'GET' : {
                return await handleGetRequest(request, Response);
            }; break;
            case 'POST' : {

            }; break;

        }
	},
} satisfies ExportedHandler<Env>;

async function handleGetRequest(request:any, Response:any) {
    if ( request.url == '/login') {
        Response.json({
            page: "Login page"
        })
    }
    else if (request.url == 'signup' ) {
        Response.json({
            page: "Signup page"
        })
    }
    else {
        Response.json({
            page: "404 Page not found";
        })
    }
}
