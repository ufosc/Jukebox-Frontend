import { mockClubs } from './mock-clubs'

export const mockUser: IUserDetailsAdd = {
  id: 0,
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
  profile:{
    is_school_email_verified: true,
    image: "http://localhost:8080/static/media/uploads/users/profiles/53af6e91903d4315814847e9fef4a17f.png",
    phone: null,
    name: "Portal",
    bio: null,
    city: null,
    state: null,
    country: null,
    birthday: null,
    school_email: "admin@ufl.edu",
    major: null,
    minor: null,
    college: null,
    graduation_date: null
  }
}
