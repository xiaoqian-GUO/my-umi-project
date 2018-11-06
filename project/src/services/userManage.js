import request from '@/utils/request';

export async function getAllUsers() {
  return request('/api/getAllUsers');
}
export async function deleteUser(params) {
    return request('/api/deleteUser', {
        method: 'POST',
        body: params,
      });
}
export async function addUser(params) {
    return request('/api/addUser', {
        method: 'POST',
        body: params,
      });
}
export async function modifyUser(params) {
    return request('/api/modifyUser', {
        method: 'POST',
        body: params,
      });
}
export async function modifyLock(params) {
    return request('/api/modifyLock', {
        method: 'POST',
        body: params,
      });
}
  


