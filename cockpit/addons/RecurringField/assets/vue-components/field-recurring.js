let instanceCount = 0;

const field = {

	_meta: {
		label: 'Recurring Event',
		info: 'Configure recurring schedules (daily, weekly, monthly)',
		icon: 'system:assets/icons/calendar.svg',

		settings: [
			{
				name: 'allowToggle',
				type: 'boolean',
				opts: { default: true }
			}
		],

		render(value) {
			if (!value || !value.enabled) return 'One-time event';

			if (value.type === 'daily') {
				return `Daily (every ${value.interval || 1} day(s))`;
			}

			if (value.type === 'weekly') {
				return `Weekly (${(value.days || []).join(', ')})`;
			}

			if (value.type === 'monthly') {
				return `Monthly (day ${value.day || 1})`;
			}

			return 'Recurring';
		}
	},

	data() {
		return {
			uid: `recurring-${++instanceCount}`,
			val: this.modelValue || {
				enabled: false,
				type: 'daily',
				interval: 1,
				days: [],
				day: 1
			}
		}
	},

	props: {
		modelValue: {
			type: Object,
			default: null
		},
		allowToggle: {
			type: Boolean,
			default: true
		}
	},

	watch: {
		modelValue: {
			deep: true,
			handler() {
				this.val = this.modelValue || this.val;
			}
		}
	},

	methods: {
		update() {
			this.$emit('update:modelValue', this.val);
		},

		setType(type) {
			this.val.type = type;
			this.update();
		},

		toggleDay(day) {
			const index = this.val.days.indexOf(day);

			if (index > -1) {
				this.val.days.splice(index, 1);
			} else {
				this.val.days.push(day);
			}

			this.update();
		}
	},

	template: `...your template...`
};

if (window.App) {
	App.component('field-recurring', field);
}

export default field;
