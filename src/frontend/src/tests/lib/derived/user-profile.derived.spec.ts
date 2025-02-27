import { userProfileLoaded, userSettings } from '$lib/derived/user-profile.derived';
import { userProfileStore } from '$lib/stores/user-profile.store';
import { mockUserProfile, mockUserSettings } from '$tests/mocks/user-profile.mock';
import { get } from 'svelte/store';

describe('user-profile.derived', () => {
	describe('userProfileLoaded', () => {
		it('should return false when user profile is not set', () => {
			userProfileStore.reset();
			expect(get(userProfileLoaded)).toBe(false);
		});

		it('should return true when user profile is set', () => {
			userProfileStore.set({ certified: true, profile: mockUserProfile });
			expect(get(userProfileLoaded)).toBe(true);
		});
	});

	describe('userSettings', () => {
		it('should return undefined when user profile is not set', () => {
			userProfileStore.reset();
			expect(get(userSettings)).toBeUndefined();
		});

		it('should return user settings if they are not nullish', () => {
			userProfileStore.set({ certified: true, profile: mockUserProfile });
			expect(get(userSettings)).toEqual(mockUserSettings);
		});

		it('should return undefined if user settings are nullish', () => {
			userProfileStore.set({ certified: true, profile: { ...mockUserProfile, settings: [] } });
			expect(get(userSettings)).toBeUndefined();
		});
	});
});
