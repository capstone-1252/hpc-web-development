import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js';

// Enable dark mode
document.documentElement.classList.add('cc--darkmode');


// eslint-disable-next-line no-undef
CookieConsent.run({
	guiOptions: {
		consentModal: {
			layout: "box",
			position: "bottom left",
			equalWeightButtons: true,
			flipButtons: false
		},
		preferencesModal: {
			layout: "box",
			position: "right",
			equalWeightButtons: true,
			flipButtons: false
		}
	},
	categories: {
		necessary: {
			readOnly: true
		}
	},
	language: {
		default: "en",
		autoDetect: "browser",
		translations: {
			en: {
				consentModal: {
					title: "We Value Your Privacy",
					description: "We use cookies to collect anonymous analytics data to help us understand how visitors use our site and improve your experience. No personal information is collected.",
					acceptAllBtn: "Accept",
					acceptNecessaryBtn: "Reject",
					showPreferencesBtn: "Manage preferences",
					footer: "<a href=\"#link\">Privacy Policy</a>\n<a href=\"#link\">Terms and conditions</a>"
				},
				preferencesModal: {
					title: "Consent Preferences Center",
					acceptAllBtn: "Accept",
					acceptNecessaryBtn: "Reject",
					savePreferencesBtn: "Save preferences",
					closeIconLabel: "Close modal",
					serviceCounterLabel: "Service|Services",
					sections: [
						{
							title: "Cookie Usage",
							description: "We use cookies to collect anonymous analytics data about how visitors interact with our site. This helps us improve performance and user experience. No personal information is collected, and no tracking for advertising purposes is done."
						},
						{
							title: "Analytics Cookies",
							description: "These cookies collect anonymous data about how you use the site. This helps us improve performance and your experience. No personal information is collected.",
							linkedCategory: "analytics"
						},
					]
				}
			}
		}
	}
});
