import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "wxt";

export default defineConfig({
	modules: ["@wxt-dev/module-react"],
	manifest: {
		action: {
			default_title: "Open Sidebar",
		},
	},
	vite: () => ({
		plugins: [tailwindcss()],
	}),
});
