import { mockClubs } from './mock-clubs'

export const mockUser: IUser & { token: string } = {
  id: 0,
  token: 'test-token',
  email: 'john@example.com',
  username: 'john@example.com',
  first_name: 'John',
  last_name: 'Doe',
  clubs: mockClubs,
  image:
    'https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg',
}
