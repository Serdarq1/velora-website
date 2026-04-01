export default{
    theme: {
        extend: {
            fontFamily: {
                "inter": "var(--font-inter)",
                "plus-jakarta-sans": "var(--font-plus-jakarta-sans)",
            },
            keyframes: {
                "accordion-down": {
                from: { height: "0" },
                to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                from: { height: "var(--radix-accordion-content-height)" },
                to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        }
    },
    plugins: [
		require("tailwindcss-animate"),
	],
}