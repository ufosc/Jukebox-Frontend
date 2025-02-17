import type { RouteObject } from 'react-router-dom'
import SearchTracks from 'src/apps/members/pages/SearchTracks';
import { Link } from 'react-router-dom';
export const membersRoutes: RouteObject[] = [
  {
    index: true,
    element: (
        <div>
          Members index
          <br />
          <Link to="search">Go to Search Tracks</Link>
        </div>
    ),
  },
  {
    path: 'search', // Depending on nesting, this could be '/members/search' or '/search'
    element: <SearchTracks />,
  },
];

