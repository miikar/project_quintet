import axios from 'axios';

const url = 'http://cloud.kurkinen.me:3001';
//const url = 'http://localhost:3001';

export const getProfiles = async () => {
  const profiles = await axios.get(url + '/profiles');
  if (!profiles || !profiles.data) return [];
  return profiles.data;
};

export const getVideoUrl = video => url + video.path;

export const uploadVideo = (profileId, file) => {
  const form = new FormData();
  form.append('video', file[0]);
  const config = {
    onUploadProgress: progress => {
      // Might not even work?
      const percent = Math.round((progress.loaded * 100) / progress.total);
      console.log('upload%', percent);
    }
  };
  return axios.post(`${url}/profiles/${profileId}/upload`, form);
};
