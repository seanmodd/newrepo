import { AppProps } from 'next/app';

import '../css/index.css';
import { AuthProvider } from '../hooks/useAuth';
import { TeamProvider } from 'hooks/useTeam';

export default function App({ Component, pageProps }: AppProps): any {
  return (
    <AuthProvider>
      <TeamProvider>
        <Component {...pageProps} />
      </TeamProvider>
    </AuthProvider>
  );
}
