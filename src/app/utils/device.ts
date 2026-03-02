export function getOrCreateDeviceId(): string {
  const key = 'learnify_device_id';

  let id = localStorage.getItem(key);

  if (!id) {
    // génère un identifiant unique pour cet appareil
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }

  return id;
}