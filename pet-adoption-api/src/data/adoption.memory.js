const initialAdoptions = [
    {
      id: 1,
      petName: "Luna",
      petType: "dog",
      adopterName: "Maria Perez",
      adopterEmail: "maria@example.com",
      status: "pending"
    },
    {
      id: 2,
      petName: "Milo",
      petType: "cat",
      adopterName: "Carlos Gomez",
      adopterEmail: "carlos@example.com",
      status: "approved"
    }
  ];
  
  let adoptions = [...initialAdoptions];
  
  const getAdoptions = () => adoptions;
  
  const resetAdoptions = () => {
    adoptions = [...initialAdoptions];
  };
  
  module.exports = {
    getAdoptions,
    resetAdoptions
  };