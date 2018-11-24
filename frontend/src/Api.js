import axios from 'axios';

export const url = 'http://cloud.kurkinen.me:3001';
// const url = 'http://localhost:3001';

export const getProfiles = async () => {
  const profiles = await axios.get(url + '/profiles');
  if (!profiles || !profiles.data) return [];
  return profiles.data;
};

export const getSimilarProfiles = async (profileId) => {
  const profiles = await axios.get(url + '/profiles/' + profileId + '/similar');
  if (!profiles || !profiles.data) return [];
  return profiles.data;
};

export const getVideoUrl = video => url + video.path;

export const uploadVideo = async (profile, file) => {
  const form = new FormData();
  form.append('video', file[0]);
  form.append('profile', JSON.stringify(profile));
  const config = {
    onUploadProgress: progress => {
      // Might not even work?
      const percent = Math.round((progress.loaded * 100) / progress.total);
      console.log('upload%', percent);
    }
  };
  const response = await axios.post(`${url}/upload`, form);
  console.log('Profile created', response.data);
  return response.data;
};

export const createProfile = async profile => {
  const response = await axios.post(`${url}/profiles`, profile);
  console.log('profile created', response.body);
  return response.data;
};
