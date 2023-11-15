import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [showAdultsOnly, setShowAdultsOnly] = useState(false);

  useEffect(() => {
    
    axios.get('https://mocki.io/v1/a0bd24a9-7d83-4b7f-997d-6193d6a3a726')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const sortUsers = (field) => {
    let order = 'asc';

    if (sortBy === field) {
      order = (sortOrder === 'asc') ? 'desc' : 'asc';
    }

    setSortBy(field);
    setSortOrder(order);

    const sortedUsers = [...users].sort((a, b) => {
      if (field === 'name' || field === 'birthdate') {
        const aField = a[field].toLowerCase();
        const bField = b[field].toLowerCase();
        return (order === 'asc') ? aField.localeCompare(bField) : bField.localeCompare(aField);
      } else {
        return (order === 'asc') ? a[field] - b[field] : b[field] - a[field];
      }
    });

    setUsers(sortedUsers);
  };

  const toggleAdultsOnly = () => {
    setShowAdultsOnly(!showAdultsOnly);
  };

  const filteredUsers = showAdultsOnly ? users.filter(user => user.age > 18) : users;

  return (
    <div>
      <button onClick={() => sortUsers('id')}>Сортировать по ID</button>
      <button onClick={() => sortUsers('name')}>Сортировать по имени</button>
      <button onClick={() => sortUsers('birthdate')}>Сортировать по дате рождения</button>
      <label>
        <input type="checkbox" checked={showAdultsOnly} onChange={toggleAdultsOnly} />
        Показывать только совершеннолетних
      </label>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Дата рождения</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.birthdate}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;