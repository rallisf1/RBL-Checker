// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: import('pocketbase').default;
			user: import('pocketbase').AuthModel | undefined;
			lang: string;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	interface Window {
		// Optional plugins
		_;
		$: typeof import("jquery");
		jQuery: typeof import("jquery");
		DataTable;
		Dropzone;

		// FlyonUI
		HSStaticMethods: any;
	}
	namespace App {
        interface Locals {
            pb: PocketBase
        }
    }
}

export { };
