import axios from 'axios';

const url = 'http://cloud.kurkinen.me:3001';
// const url = 'http://localhost:3001';

export const getProfiles = async () => {
  const profiles = await axios.get(url + '/profiles');
  if (!profiles || !profiles.data) return [];
  return profiles.data;
};
