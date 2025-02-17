
// Mock data for members
const mockMembers = [
  { id: 1, name: 'John Smith', role: 'Member', points: 20, joined: 'January 1, 2024' },
  { id: 2, name: 'Jane Smith', role: 'Member', points: 15, joined: 'February 2, 2024' },
  { id: 3, name: 'Santa Claus', role: 'Admin', points: 30, joined: 'March 3, 2024' },
  { id: 4, name: 'Bobby Brown', role: 'Member', points: 10, joined: 'April 4, 2024' },
];

export const MembersList = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Members</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Points</th>
                <th className="py-3 px-4 text-left">Joined</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockMembers.map((member) => (
                <tr key={member.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{member.name}</td>
                  <td className="py-3 px-4">{member.role}</td>
                  <td className="py-3 px-4">{member.points}</td>
                  <td className="py-3 px-4">{member.joined}</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-500 hover:text-blue-700">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};