import {postRequest, postSecretRequest} from '../index.network';
import {User} from "../../types/UserModel";

export async function registration(user: User, token:any) {
  const body = JSON.stringify({ name: user.name, email: user.email, password: user.password, phone: user.phone });
 return await postSecretRequest(token, '/api/user/registration', body);
}

export async function auth(user: User, token:any) {
    const body = JSON.stringify({ email: user.email, password: user.password });
    return await postSecretRequest(token, '/api/user/registration', body);
}