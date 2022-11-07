import { v4 as uuidv4 } from 'uuid';

export const generateNewDeviceIdentifier = () => {
  if(localStorage.getItem('identifier') === null) {
    localStorage.setItem('identifier', uuidv4());
  }
}

export const getDeviceIdentifier = () => {
  if(localStorage.getItem('identifier') === null) generateNewDeviceIdentifier();

  if(localStorage.getItem('identifier') != null) {
    return localStorage.getItem('identifier');
  }
}

export const getSpecificKeyValueResult = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.log(e);
  }
}