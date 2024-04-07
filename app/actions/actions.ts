'use server'
import { signOut } from '@/auth'; 
export async function signOut2() {
  // ...
  await signOut();
}
 