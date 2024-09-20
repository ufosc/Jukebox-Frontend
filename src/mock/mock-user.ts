import { mockGroups } from './mock-groups'

export const mockUser: IUser & { token: string } = {
  id: '12345',
  token: 'test-token',
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Doe',
  groups: mockGroups.map((group) => ({ id: group.id, name: group.name })),
}
