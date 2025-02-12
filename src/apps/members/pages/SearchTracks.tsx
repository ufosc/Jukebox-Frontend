import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeManager } from 'src/utils/ui/themeManager'; // Import the ThemeManager
import './searchtracks.scss';

const dummySongs = [
  { id: 1, title: 'Song One', album: 'Album One', artist: 'Artist One' },
  { id: 2, title: 'Song Two', album: 'Album Two', artist: 'Artist Two' },
  { id: 3, title: 'Song Three', album: 'Album Three', artist: 'Artist Three' },
  { id: 4, title: 'Song Four', album: 'Album Four', artist: 'Artist Four' },
  { id: 5, title: 'Song Five', album: 'Album Five', artist: 'Artist Five' },
];

const SearchTracks = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close the dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
        document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    // Use the ThemeManager instance to toggle the theme.
    const themeManager = ThemeManager.getInstance();
    const currentMode = themeManager.getMode();
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    themeManager.setMode(newMode);
  };

  return (
      <div className="search-tracks">
        <header className="search-header">
          <div className="header-left">
            <div className="dropdown" ref={dropdownRef}>
              <button className="dropdown-button" onClick={toggleDropdown}>
                Open Source Clubs Jukebox{' '}
                <span className="arrow">{dropdownOpen ? '▲' : '▼'}</span>
              </button>
              {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link className="dropdown-item" to="/auth/login">
                      Login
                    </Link>
                    <Link className="dropdown-item" to="/auth/logout">
                      Logout
                    </Link>
                  </div>
              )}
            </div>
          </div>
          <div className="header-right">
            <nav>
              <ul>
                <li>
                  <Link to="/jukebox">Jukebox</Link>
                </li>
                <li>
                  <Link to="/search">Search Songs</Link>
                </li>
                <li>
                  <Link to="/other">Other</Link>
                </li>
              </ul>
            </nav>
            <button className="theme-toggle" onClick={toggleTheme}>
              Toggle Theme
            </button>
          </div>
        </header>

        <main className="search-main">
          <h1 className="title">Search Songs</h1>
          <div className="search-form">
            <input type="text" placeholder="Song Name" />
            <input type="text" placeholder="Album Name" />
            <input type="text" placeholder="Artist Name" />
            <button className="search-button">Search Tracks</button>
          </div>

          <div className="song-results">
            {dummySongs.map((song) => (
                <div key={song.id} className="song-card">
                  <div className="song-info">
                    <h2>{song.title}</h2>
                    <p>
                      <strong>Album:</strong> {song.album}
                    </p>
                    <p>
                      <strong>Artist:</strong> {song.artist}
                    </p>
                  </div>
                  <button
                      className="add-button"
                      onClick={() => alert(`Added "${song.title}" to queue`)}
                  >
                    +
                  </button>
                </div>
            ))}
          </div>
        </main>
      </div>
  );
};

export default SearchTracks;
