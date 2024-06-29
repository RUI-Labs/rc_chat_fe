/// <reference types="astro/client" />

declare namespace App {
	interface Locals extends Runtime {
		session: import("lucia").Session | null;
		user: import("lucia").User | null;
	}
}
