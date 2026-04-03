export class SignUpDto {
  name: string;
  email: string;
  password: string;
  pin: string;
  role?: string; // opcional, default será 'USER'
}
