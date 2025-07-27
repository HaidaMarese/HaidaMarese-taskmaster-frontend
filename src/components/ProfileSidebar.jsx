function ProfileSidebar() {
  return (
    <aside className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <ul className="space-y-3">
        <li className="text-blue-700 hover:underline cursor-pointer">Update your profile info</li>
        <li className="text-blue-700 hover:underline cursor-pointer">Change Password</li>
        <li className="text-red-600 hover:underline cursor-pointer">Delete Account</li>
      </ul>
    </aside>
  );
}

export default ProfileSidebar;
