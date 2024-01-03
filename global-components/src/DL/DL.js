const delay = (time=1000) => {
  return new Promise(resolve => setTimeout(resolve, time));
}

const login = async (username, password) => {
  const personalDetails = {
    name: "Sam",
    phone: "065666666",
  };

  await delay();
  
  return personalDetails;
}

const register = async (username, password, phone) => {
  const personalDetails = {
    name: "Sam",
    phone: "067666666",
  };
  
  await delay();
  
  return personalDetails;
}

const getItems = async () => {
  const items = [{ itemDate: "21.12.2023", itemTime: "09:35:00", id: "0" }, 
  { itemDate: "24.12.2023", itemTime: "11:10:00.0001", id: "1" },
  { itemDate: "01.01.2024", itemTime: "15:45:00", id: "2" }];
  
  await delay();
  
  return items;
}

const deleteItem = async (date, time, id) => {
  await delay();
  
  return true;
}

export {
  login,
  register,
  getItems,
  deleteItem,
};