const path = require("path");

module.exports = {
	webpack: {
		include: [
			path.resolve(__dirname, "src/"),
			path.resolve(__dirname, "src/components/"),
			path.resolve(__dirname, "src/assets/"),
			path.resolve(__dirname, "src/api/"),
			path.resolve(__dirname, "src/hooks/"),
		],
		alias: {
			"@": path.resolve(__dirname, "src/"),
			"@components": path.resolve(__dirname, "src/components/"),
			"@assets": path.resolve(__dirname, "src/assets/"),
			"@api": path.resolve(__dirname, "src/api/"),
			"@hooks": path.resolve(__dirname, "src/hooks/"),
		},
		extensions: ["", ".js", ".jsx"],
		modules: ["src", "node_modules"],
	},
};
