import { mockClubs } from './mock-clubs'

export const mockUser: IUser & { token: string } = {
  id: 0,
  token: 'test-token',
  email: 'john@example.com',
  username: 'john@example.com',
  first_name: 'John',
  last_name: 'Doe',
  // Get actual clubs mock user is assigned to
  clubs: mockClubs
    .filter((club) => club.members.some((mem) => mem.id === 0))
    .map((club) => ({
      id: club.id,
      name: club.name,
      role: club.members.reduce((prev: ClubRole | null, curr) => {
        if (curr.id === 0) {
          return curr.role
        }
        return prev
      }, null)!,
    })),
  image:
    'https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg',
  created_at: '8/20/2024',
  updated_at: '5/15/2024',
}
