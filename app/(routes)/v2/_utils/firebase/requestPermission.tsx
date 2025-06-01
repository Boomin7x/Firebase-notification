export const requestPermission = async () => {
  const perm = await Notification.requestPermission();
  if (!perm) {
    console.error("Notification permission request was denied");
    return;
  }
  return perm;
};
