import React, { useState, useEffect } from 'react';
import '../App.css';
import { getTiles, addTile, deleteTile } from '../data/tileManager';
import TILE_DIMENSIONS from '../data/tileData';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
  ]);
  
  const [tiles, setTiles] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });
  const [newTile, setNewTile] = useState({ 
    name: '', 
    roomType: 'bathroom', 
    areaType: 'wall',
    dimensions: '', 
    width: 300,
    height: 300,
    imageUrl: '' 
  });
  
  // Get available dimensions based on room type and area type
  const getAvailableDimensions = () => {
    const roomType = newTile.roomType;
    const areaType = newTile.areaType || 'wall';
    
    // For rooms with specific wall/floor dimensions
    if (['bathroom', 'kitchen', 'bedroom'].includes(roomType)) {
      return TILE_DIMENSIONS[roomType]?.[areaType] || [];
    }
    
    // For rooms with general dimensions
    return TILE_DIMENSIONS[roomType] || [];
  };
  
  // Preview URL for uploaded images
  const [imagePreview, setImagePreview] = useState('');

  // Load tiles on component mount
  useEffect(() => {
    setTiles(getTiles());
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.email) {
      const user = {
        id: users.length + 1,
        ...newUser
      };
      setUsers([...users, user]);
      setNewUser({ name: '', email: '', role: 'user' });
    }
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setNewTile({ ...newTile, imageUrl: previewUrl });
    }
  };

  const handleAddTile = (e) => {
    e.preventDefault();
    if (newTile.name && newTile.roomType && newTile.dimensions) {
      // Add the new tile with all its data including image URL
      const tile = addTile({
        ...newTile,
        id: Date.now() // Simple ID generation
      });
      setTiles(getTiles());
      setNewTile({ 
        name: '', 
        roomType: 'bathroom', 
        areaType: 'wall',
        dimensions: '', 
        width: 300,
        height: 300,
        imageUrl: '' 
      });
      setImagePreview('');
    }
  };

  const handleDeleteTile = (tileId) => {
    deleteTile(tileId);
    setTiles(getTiles());
  };

  return (
    <div className="admin-panel">
      <header className="app-header">
        <div className="app-header-inner">
          <h1>NPV Visuals</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/viewer">Tile Viewer</a></li>
              <li><a href="/admin">Admin Panel</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <div className="admin-container">
        <div className="tabs">
          <button 
            className={activeTab === 'users' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('users')}
          >
            User Management
          </button>
          <button 
            className={activeTab === 'tiles' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('tiles')}
          >
            Tile Management
          </button>
        </div>
        
        {activeTab === 'users' && (
          <div className="tab-content users-tab">
            <h2>User Management</h2>
            
            <div className="user-form">
              <h3>👤 Add New User</h3>
              <form onSubmit={handleAddUser}>
                <div className="form-group">
                  <label htmlFor="userName">🏷️ Name:</label>
                  <input 
                    type="text" 
                    id="userName" 
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="userEmail">📧 Email:</label>
                  <input 
                    type="email" 
                    id="userEmail" 
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="userRole">🔑 Role:</label>
                  <select 
                    id="userRole" 
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <button type="submit" className="btn primary">➕ Add User</button>
              </form>
            </div>
            
            <div className="users-list">
              <h3>Existing Users</h3>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <button 
                            className="btn danger"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'tiles' && (
          <div className="tab-content tiles-tab">
            <h2>Tile Management</h2>
            
            <div className="tile-form">
              <h3>🧱 Add New Tile</h3>
              <form onSubmit={handleAddTile}>
                <div className="form-group">
                  <label htmlFor="tileName">🏷️ Tile Name:</label>
                  <input 
                    type="text" 
                    id="tileName" 
                    value={newTile.name}
                    onChange={(e) => setNewTile({...newTile, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="tileRoomType">🏠 Room Type:</label>
                  <select 
                    id="tileRoomType" 
                    value={newTile.roomType}
                    onChange={(e) => setNewTile({...newTile, roomType: e.target.value})}
                  >
                    <option value="bathroom">Bathroom</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="bedroom">Bedroom</option>
                    <option value="floor">Floor</option>
                    <option value="parking">Parking</option>
                    <option value="steps">Steps</option>
                    <option value="elevation">Elevation</option>
                  </select>
                </div>
                
                {/* Area Type selector for rooms with both wall and floor areas */}
                {(['bathroom', 'kitchen', 'bedroom'].includes(newTile.roomType)) && (
                  <div className="form-group">
                    <label htmlFor="tileAreaType">📍 Area Type:</label>
                    <select 
                      id="tileAreaType" 
                      value={newTile.areaType || 'wall'}
                      onChange={(e) => setNewTile({...newTile, areaType: e.target.value})}
                    >
                      <option value="wall">Wall</option>
                      <option value="floor">Floor</option>
                    </select>
                  </div>
                )}
                
                <div className="form-group">
                  <label htmlFor="tileDimensions">📐 Dimensions (W x H):</label>
                  <select 
                    id="tileDimensions" 
                    value={newTile.dimensions}
                    onChange={(e) => {
                      const selectedDim = getAvailableDimensions().find(dim => dim.name === e.target.value);
                      setNewTile({
                        ...newTile, 
                        dimensions: e.target.value,
                        width: selectedDim ? selectedDim.width : 300,
                        height: selectedDim ? selectedDim.height : 300
                      });
                    }}
                    required
                  >
                    <option value="">Select Dimensions</option>
                    {getAvailableDimensions().map((dim, index) => (
                      <option key={index} value={dim.name}>
                        {dim.name} ({dim.width}mm x {dim.height}mm)
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="tileImage">🖼️ Tile Image:</label>
                  <input 
                    type="file" 
                    id="tileImage" 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Preview" style={{maxWidth: '100px', maxHeight: '100px', marginTop: '10px'}} />
                    </div>
                  )}
                </div>
                
                <button type="submit" className="btn primary">➕ Add Tile</button>
              </form>
            </div>
            
            <div className="tiles-list">
              <h3>Existing Tiles</h3>
              <div className="tiles-grid-admin">
                {tiles.map(tile => (
                  <div key={tile.id} className="tile-card-admin">
                    <div className="tile-image-placeholder">
                      <img 
                        src={tile.imageUrl} 
                        alt={tile.name} 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2NjYyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1zaXplPSIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                    </div>
                    <div className="tile-details">
                      <h4>{tile.name}</h4>
                      <p>Room: {tile.roomType}</p>
                      <p>Size: {tile.dimensions || `${tile.width}mm x ${tile.height}mm`}</p>
                    </div>
                    <button 
                      className="btn danger"
                      onClick={() => handleDeleteTile(tile.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;