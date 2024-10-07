import { mockClubs } from './mock-clubs'

export const mockUser: IUser & { token: string } = {
  id: '12345',
  token: 'test-token',
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Doe',
  clubs: mockClubs.map((club) => ({
    id: club.id,
    name: club.name,
    ownerId: '12345',
  })),
  image:
    'https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg',
}
