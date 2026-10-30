import {auth} from '@/lib/auth';
import { headers } from 'next/headers';

export default async function getTokenFromServer() {
  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  }); // Get the JWT token from the auth API

  return jwtToken
}