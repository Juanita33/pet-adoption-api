const users = [
    {
      id: 1,
      firstName: "Juanita",
      lastName: "Perez",
      email: "juanita@example.com",
      role: "user"
    },
    {
      id: 2,
      firstName: "Carlos",
      lastName: "Gomez",
      email: "carlos@example.com",
      role: "admin"
    }
  ];
  
  const getUsers = () => users;
  
  module.exports = {
    getUsers
  };