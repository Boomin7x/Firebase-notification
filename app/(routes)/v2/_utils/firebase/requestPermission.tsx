export const requestPermission = async (
  getPermissions: (permission: NotificationPermission) => void
) => {
  const perm = await Notification.requestPermission();
  if (!perm) {
    console.error("Notification permission request was denied");
    return;
  }
  getPermissions(perm);
};
