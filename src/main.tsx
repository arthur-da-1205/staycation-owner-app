import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@styles/global.less';
import 'virtual:uno.css';
import { AppProvider } from '@providers/app.provider';
import { CustomProvider } from 'rsuite';
import App from '@App';

const Main: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <CustomProvider>
          <App />
        </CustomProvider>
      </AppProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById('root');

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(<Main />);
