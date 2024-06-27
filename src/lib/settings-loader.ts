import settings from './settings';

export async function fromSettings() {
  return { ...settings };
}
